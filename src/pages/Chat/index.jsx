import React, { useEffect, useState } from "react"; // Importing React and useState and useEffect hook for state management.
import {
  Button, // Material-UI Button component for clickable buttons
  Grid // Material-UI Grid component for layout
} from "@mui/material";
import Textarea from "@mui/joy/Textarea"; // Importing the Textarea component from Joy UI (an experimental part of Material-UI)
import Images from "../../constants/images"; // Importing image constants
import ChatStyles from "../../styles/chat"; // Importing custom styles
import ReXMessage from "../../components/ReXMessage"; 
import api from "../../api/session"; // Importing API utility for session management
import OpenAI from "openai"; // Importing OpenAI library for interacting with the OpenAI API
import { useParams } from "react-router-dom"; // Importing useParams hook for accessing route parameters
import UserMessage from "../../components/UserMessage"; // Importing UserMessage component for displaying user messages
import useMediaQuery from "@mui/material/useMediaQuery"; // Importing useMediaQuery hook for responsive design
import WidthError from "../../components/WidthError";

const Chat = () => {
  const { id } = useParams();
  const [userPrompt, setUserPrompt] = useState("");
  const [sessions, setSessions] = useState([]);
  const [thisSession, setThisSession] = useState({});
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

  const matches = useMediaQuery("(min-width:600px)");

  let chatKeys = [];


  useEffect(() => {

    const fetchSessions = async () => {
      try {

        const response = await api.get("/sessions");

        setSessions(response.data);

        setThisSession(
          response.data.find(
            (session) => parseInt(session?.id, 10) === parseInt(id, 10)
          )
        );

        handleScroll();
        window.addEventListener("scroll", handleScroll);
      } catch (err) {

        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(err);
        }
      }

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    fetchSessions();

  }, []);


  const handleScroll = () => {

    const scrollPosition = window.scrollY;

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedSession = {};


    setTimeout(async function () {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const formattedDate = months[month] + " " + day + ", " + year;
      try {

        const response = await callOpenAIAPI();


        thisSession.chats.push({ user: userPrompt, ReX: response });

        updatedSession = {
          id: id,
          date: formattedDate,
          chats: thisSession.chats,
          isSessionEnded: thisSession.isSessionEnded,
        };

        for (let i = 0; i < updatedSession.chats.length; i++) {
          chatKeys.push(Object.keys(updatedSession.chats[i]));
        }
        // console.log("chatKeys = ", chatKeys);
      }
      catch(error) {
        alert(error);
        return;
      }
      try {

        const response = await api.patch(`sessions/${id}/`, updatedSession);

        setSessions(
          sessions.map((session) =>
            session.id === id ? response.data : session
          )
        );
        setUserPrompt("");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }, 2000);
  };


  async function callOpenAIAPI() {

    if (userPrompt === "") {
      return "Please enter prompt. It can't be empty."
    }

    try {

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Your name is ReX. You are a career advice assistant. You give advice to user about his career as reply to his prompt. Limit your response to 100 words. You remember the previous conversations and details given by the user.",
          }, 
          {
            role: "user",
            content: userPrompt,
          }
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 100,
      });

      console.log("completion: ", completion);

      return completion.choices[0].message.content;



    } catch(error) {

      console.log("Fetch error: ", error);

      return "Error in fetch response from OpenAI. Please try again.";
    }
  }


  return (

    matches ? (
      <WidthError />
    ) : (
      <>
        <Grid>
          <Grid {...ChatStyles.chatImage}>
            <img src={Images.HomeRex} alt="ReX" style={{ width: "100%" }} />
          </Grid>
          <Grid {...ChatStyles.chatDisplayBackground}>
            <Grid {...ChatStyles.chatsContainer}>
              {thisSession?.chats?.length
                ? (
                  thisSession?.chats?.map((chat, i) =>
                    Object.keys(chat).map((k) =>
                      k === "ReX" ? (
                        <ReXMessage reXMessage={chat.ReX} key={"rex" + i} />
                      ) : (
                        <UserMessage userMessage={chat.user} key={"user" + i} />
                      )
                    )
                  )
                )
                : null}
            </Grid>
            {thisSession && !thisSession.isSessionEnded ? (
              <Grid {...ChatStyles.toSendArea}>
                <Textarea
                  {...ChatStyles.textArea}
                  name="Soft"
                  placeholder="Type a message to ReX ..."
                  variant="soft"
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onFocus={(e) => e.preventDefault()}
                  value={userPrompt}
                />
                <Button {...ChatStyles.sendButton} onClick={handleSubmit}>
                  <img
                    src={Images.SendButton}
                    alt="send"
                    {...ChatStyles.sendButtonImage}
                  />
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </>
    )
  );
};


export default Chat;