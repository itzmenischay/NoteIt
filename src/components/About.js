import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h2 className="about-title">About NoteIt</h2>
        <p className="about-text">
          <strong>NoteIt</strong> is a secure and cloud-based note-taking app that allows users to store and manage their notes from anywhere. 
          With end-to-end encryption, your data remains safe and accessible across all your devices.
        </p>
        <p className="about-text">
          Easily create, edit, and delete notes with a seamless and user-friendly interface. Stay organized and never lose your important 
          thoughts again!
        </p>
        <p className="about-author">- created by Nischay</p>
      </div>
    </div>
  );
};

export default About;
