import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import SideBarnav from "../components/sideBarnav";
import { useNavigate } from "react-router-dom";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import Host from "../components/api";
import { IoIosAddCircle, IoIosRemove } from "react-icons/io";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';

export default function Editor() {
   
    return (
        <SideBarnav body={<Body />} />
    );
}

function Body() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef();
    const id = sessionStorage.getItem("user_id");
    const [categoryName, setcategoryName] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(1);
    const [topics, setTopics] = useState([{
        id: 1,
        category: "",
        scenario: "",
        questions: ["", ""]
    }]);

    useEffect(() => {
        axios.post(`${Host}/GetTopics`, { id: parseInt(categoryId) })
            .then((res) => {
                let data = res.data;
                if (data.success) {
                    setcategoryName(data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [categoryId]);

    const handleSaveQuestions = () => {
        // Log the updated state without <p> tags
        const updatedState = topics.map(topic => ({
            ...topic,
            scenario: topic.scenario.replace(/<\/?p>/g, ''), // Remove <p> tags
        }));
        console.log(updatedState);
    };

    const addNewTopic = () => {
        if (topics.length < 10) {
            setTopics(prevTopics => [...prevTopics, {
                id: currentTopic + 1,
                category: "",
                scenario: "",
                questions: ["", ""]
            }]);
            setCurrentTopic(prev => prev + 1);
        }
    };

    const removeTopic = (id) => {
        if (topics.length > 1) {
            setTopics(prevTopics => prevTopics.filter(topic => topic.id !== id));
        }
    };

    const handleCategoryChange = (index, value) => {
        setTopics(prevTopics => {
            const updatedTopics = [...prevTopics];
            updatedTopics[index].category = value;
            return updatedTopics;
        });
    };

    const handleScenarioChange = (index, value) => {
        const updatedTopics = [...topics];
        updatedTopics[index].scenario = value;
        setTopics(updatedTopics);
    };

    const handleQuestionChange = (topicIndex, questionIndex, value) => {
        setTopics((prevTopics) => {
            const updatedTopics = [...prevTopics];
            updatedTopics[topicIndex].questions[questionIndex] = editorRef.current.getAllHtml();
            return updatedTopics;
        });
    };
    
   

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                    <Header title="Text Editor" />
                    <TooltipComponent content="Add New" position="BottomCenter" >
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer p-1 hover-bg-light-gray rounded-lg flex items-center">
                                <IoIosAddCircle color="#4ade80" className='w-8 h-6' />
                                <p className="text-green-400 font-medium text-base" onClick={addNewTopic}>Add New</p>
                            </div>
                        </div>
                    </TooltipComponent>
                </div>

                {topics.map((topic, index) => (
                    <div key={index} className="mb-5">
                        {index !== 0 && <hr className="my-4 border-t border-gray-300" />} {/* Separator line */}
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-medium">Topic {topic.id}</h2>
                            {index > 0 && (
                                <div className="cursor-pointer p-1 hover-bg-light-gray rounded-lg flex items-center" onClick={() => removeTopic(topic.id)}>
                                    <IoIosRemove color="#ef4444" className='w-8 h-6' />
                                    <p className="text-red-400 font-medium text-base">Remove</p>
                                </div>
                            )}
                        </div>
                        <TextField
                            id={`category-${index}`}
                            select
                            label="Select Topics"
                            value={topic.category}
                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                            helperText="Please select Topics"
                            className="mt-5 w-60"
                        >
                            {categoryName.map((option, optionIndex) => (
                                <MenuItem key={optionIndex} value={option.topics}>
                                    {option.topics}
                                </MenuItem>
                            ))}
                        </TextField>

                        <p className="text-xl font-medium mt-4">Scenario</p>
                        <RichTextEditorComponent
                            ref={editorRef}
                            value={topic.scenario}
                            placeholder="Enter your Scenario here..."
                            onPaste={(e) => e.preventDefault()}
                            pasteCleanupSettings={{
                                prompt: false
                            }}
                            created={() => {
                                // Add an event listener to capture changes in the editor
                                editorRef.current.element.addEventListener("input", () => handleScenarioChange(index, editorRef.current.getHtml()));
                            }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>

                        {topic.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="mt-5">
                                <label className="block text-xl font-medium mb-2">Scenario Question {questionIndex + 1}</label>
                                <RichTextEditorComponent
                                    value={question}
                                    onChange={(e) => handleQuestionChange(index, questionIndex, e.target.value)}
                                    placeholder="Enter your Scenario Question here..."
                                    onPaste={(e) => e.preventDefault()} 
                                    pasteCleanupSettings={{
                                        prompt: false
                                    }}
                                >
                                    <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                                </RichTextEditorComponent>
                            </div>
                        ))}

                    </div>
                ))}

                <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
                    <Button variant="contained" onClick={handleSaveQuestions}>Save Questions</Button>
                </Stack>
            </div>
        </>
    );
}