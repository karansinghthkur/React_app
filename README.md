# Audio Streaming React Application

This project is a React-based audio streaming application that allows two users to stream audio between each other, apply audio filters, and visualize the audio stream in real-time.

## Project Overview

The application consists of three main components:

1. Audio Streaming: Enables peer-to-peer audio streaming using WebRTC.
2. Audio Filter: Implements a basic frequency and gain filter on the audio stream.
3. Audio Visualizer: Provides a real-time visualization of the audio stream as a waveform.

## Approach

The project was developed using a modular approach, with separate components for each major feature:

1. `AudioStream.js`: Handles the WebRTC connection and audio streaming between peers.
2. `AudioFilter.js`: Implements the audio filter using the Web Audio API.
3. `AudioVisualizer.js`: Creates a real-time visualization of the audio stream using the Canvas API.

The main `App.js` component orchestrates these modules and manages the application state.

## Tools Used

- React: For building the user interface and managing component state.
- WebRTC: For peer-to-peer audio streaming.
- Web Audio API: For implementing audio filters and processing.
- Canvas API: For creating the audio visualization.
- react-app-rewired: For overriding create-react-app configurations without ejecting.

## Challenges Encountered

1. WebRTC Setup: Implementing the WebRTC connection process was challenging due to the complexity of signaling and ICE candidate exchange.

2. Browser Compatibility: Ensuring consistent behavior across different browsers required additional testing and adjustments.

3. Real-time Audio Processing: Optimizing the audio filter and visualization for real-time performance while maintaining low latency was a significant challenge.

4. State Management: Coordinating the state between different components (streaming, filter, and visualization) required careful planning to avoid conflicts and ensure smooth operation.

## How to Run the Project

1. Clone the repository: git clone https://github.com/karansinghthkur/ReactChallenge.git

2. Navigate to the project directory:

cd audio-streaming-app

3. Install dependencies:

npm install

4. Start the development server:

npm start

5. Open two browser windows and navigate to `http://localhost:3000` in one and `http://localhost:3000/#init` in the other.

6. Follow the on-screen instructions to connect the peers and start streaming audio.

## Future Improvements

- Implement a signaling server for easier peer connection.
- Add support for video streaming.
- Enhance the audio filter with more options and a user-friendly interface.
- Improve error handling and provide better user feedback for connection issues.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
