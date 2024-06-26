import React from "react";
import '../styles/FAQ.css';
import { useState } from "react";

export default function FAQ() {
    const [selected, setSelected] = useState(null)
    const toggle = i => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
    return (
        <div className="wrapper">
            <div className="accordion">
                {faq.map((item, i) => (
                    <div className="item" key={i}>
                        <div className="title" onClick={() => toggle(i)}>
                            <h2>{item.question}</h2>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={selected === i ? 'content show' : 'content'}>{item.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const faq = [
    {
        "question": "What events does ITI host annually?",
        "answer": "ITI hosts a variety of events annually including tech fairs, coding competitions, guest lectures from industry experts, and graduation ceremonies."
    },
    {
        "question": "Where can I find information about upcoming ITI events?",
        "answer": "Information about upcoming ITI events can be found on the official ITI website, social media pages, and through email newsletters sent to students and alumni."
    },
    {
        "question": "How can I register for an ITI event?",
        "answer": "You can register for ITI events through the event registration links provided on the official ITI website or through specific event announcements on social media."
    },
    {
        "question": "Are ITI events open to the public?",
        "answer": "Some ITI events are open to the public, while others are exclusively for students, alumni, and invited guests. Please check the event details for specific information."
    },
    {
        "question": "Can I volunteer for ITI events?",
        "answer": "Yes, ITI often seeks volunteers for events. Interested individuals can sign up through volunteer registration forms available on the ITI website or by contacting the event organizers directly."
    },
    {
        "question": "What COVID-19 precautions are in place for ITI events?",
        "answer": "ITI follows all government and health guidelines for COVID-19 safety, including social distancing, mask mandates, and sanitization protocols. Specific measures will be detailed in event announcements."
    }
]
