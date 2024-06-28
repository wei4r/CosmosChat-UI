# CosmoChat UI

## Description
This is an app where the user named Andrew interacts with an openAI powered career advice assistant name ReX. 
This is a beginner mission done during my internship at Radical AI.

## Tools used:
* React.js
* Material UI
* Framer Motion
* Axios
* OpenAI

## Usage
In the project directory, you can use the following commands:

1. `npm start`:\
	Runs the React app in development mode.\
	Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
	The page will automatically reload when you make changes.

2. `node ./server.js`:\
	Runs the `server.js` file to start the server. The chat sessions are stored in the `data/db.json` file in JSON format.\
	The server will be running on port 3500.

## Project Setup Instructions:
To set up CosmoChat UI, follow these steps:

1. **Clone the repository to your local machine**.
	- To clone the repository, run: 
	  ```
	  git clone https://github.com/wei4r/CosmosChat-UI.git
	  ```

2. **Ensure you have Node.js and npm installed**:
	- If you haven't already, download and install [Node.js](https://nodejs.org/en).

3. **Navigate to the root directory of the project**: 
	- To navigate to the root directory of the project, run: 
	  ```
	  cd CosmoChatUI
	  ```

4. **Install Dependencies**:
	- To install the required dependencies, run: 
	  ```
	  npm install
	  ```

5. **Add your OpenAI API key**:
	- Obtain your OpenAI API key from [OpenAI](https://platform.openai.com/api-keys).
	- Create a `.env` file in the root directory of the project.
	- Add the following line to the `.env` file, replacing `{YOUR_API_KEY}` with your actual API key:
	  ```
	  REACT_APP_OPENAI_API_KEY={YOUR_API_KEY}
	  ```

6. **Run the Server**:
	- To run the server that stores chat sessions in the `data/db.json` file in JSON format, execute:
	  ```
	  node ./server.js
	  ```

7. **Start the React Application**:
	- To start the React application, run:
	  ```
	  npm start
	  ```