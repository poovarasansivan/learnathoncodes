import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import SideBarnav from "../../components/sideBarnav";
import { useNavigate } from "react-router-dom";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import Host from "../../components/api";
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
    const [saveButtonActive, setSaveButtonActive] = useState(true);
    const [topics, setTopics] = useState([{
        id: 0,
        category: "",
        scenario: "",
        question1: "",
        question_1_key: "",
        question2: "",
        question_2_key: "",
        question3: "",
        question_3_key: "",
    }]);

    const question1Refs = useRef(topics.map(() => React.createRef()));
    const question_1_keyRefs = useRef(topics.map(() => React.createRef()));
    const question2Refs = useRef(topics.map(() => React.createRef()));
    const question_2_keyRefs = useRef(topics.map(() => React.createRef()));
    const question3Refs = useRef(topics.map(() => React.createRef()));
    const question_3_keyRefs = useRef(topics.map(() => React.createRef()));
    const [errorMessage, setErrorMessage] = useState(""); // Added error message state

    var user_id = sessionStorage.getItem("user_id")
    if (user_id === null || user_id === undefined) {
        navigate('/login');
    }
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

    const resetTopics = () => {
        const initialTopics = [{
            id: 0,
            category: "",
            scenario: "",
            question1: "",
            question_1_key: "",
            question2: "",
            question_2_key: "",
            question3: "",
            question_3_key: "",
        }];
        setTopics(initialTopics);
        setCurrentTopic(1);

        // Reset refs
        question1Refs.current = initialTopics.map(() => React.createRef());
        question_1_keyRefs.current = initialTopics.map(() => React.createRef());
        question2Refs.current = initialTopics.map(() => React.createRef());
        question_2_keyRefs.current = initialTopics.map(() => React.createRef());
        question3Refs.current = initialTopics.map(() => React.createRef());
        question_3_keyRefs.current = initialTopics.map(() => React.createRef());
    };


    useEffect(() => {
        const fetchButtonStatus = () => {
            axios.get(`${Host}/ButtonStatus`)
                .then((res) => {
                    let data = res.data;
                    // console.log(data)
                    const buttonStatus = data.events[0].save_question === 1;
                    // console.log(buttonStatus)
                    setSaveButtonActive(buttonStatus);

                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchButtonStatus();

        const interval = setInterval(() => {
            fetchButtonStatus();
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    const handleSaveQuestions = () => {
        if (saveButtonActive) {

            const updatedState = topics.map(topic => ({
                ...topic,
                scenario: topic.scenario,
                question1: topic.question1,
                question_1_key: topic.question_1_key, // Corrected field name
                question2: topic.question2,
                question_2_key: topic.question_2_key, // Corrected field name
                question3: topic.question3,
                question_3_key: topic.question_3_key, // Corrected field name
            }));
            // console.log(updatedState);

            const dataToSave = updatedState.map(topic => ({
                category_id: parseInt(categoryId),
                topics: topic.category,
                scenario: topic.scenario,
                question_1: topic.question1,
                question_1_key: topic.question_1_key, // Corrected field name
                question_2: topic.question2,
                question_2_key: topic.question_2_key, // Corrected field name
                question_3: topic.question3,
                question_3_key: topic.question_3_key, // Corrected field name
                created_by: id
            }));

            var status = 1

            updatedState.forEach(element => {
                if (element.category == 0 || element.category == " ") {
                    status = 0
                    return
                }
            });

            if (status == 1) {
                // console.log("Data to save:", dataToSave);

                axios.post(`${Host}/insertQuestion`, dataToSave)
                    .then(response => {
                        // console.log("Data inserted successfully", response.data);
                        resetTopics();
                    })
                    .catch(error => {
                        console.error("Error inserting data:", error);
                    });
            }

        }
        else {
            console.log("time over")
        }
    };

    const addNewTopic = () => {
        if (topics.length < 10) {
            const newTopicId = currentTopic + 1;

            const newTopic = {
                id: newTopicId,
                category: "",
                scenario: "",
                question1: "",
                question_1_key: "",
                question2: "",
                question_2_key: "",
                question3: "",
                question_3_key: ""
            };

            setTopics(prevTopics => [...prevTopics, newTopic]);
            setCurrentTopic(newTopicId);

            question1Refs.current.push(React.createRef());
            question_1_keyRefs.current.push(React.createRef());
            question2Refs.current.push(React.createRef());
            question_2_keyRefs.current.push(React.createRef());
            question3Refs.current.push(React.createRef());
            question_3_keyRefs.current.push(React.createRef());
        }
    };



    const removeTopic = (id) => {
        if (topics.length > 1) {
            setTopics(prevTopics => prevTopics.filter(topic => topic.id !== id));

            question1Refs.current.splice(id - 1, 1);
            question_1_keyRefs.current.splice(id - 1, 1);
            question2Refs.current.splice(id - 1, 1);
            question_2_keyRefs.current.splice(id - 1, 1);
            question3Refs.current.splice(id - 1, 1);
            question_3_keyRefs.current.splice(id - 1, 1);
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

    const handleQuestionChange = (topicIndex, value, fieldName) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex][fieldName] = value;
        setTopics(updatedTopics);
    };



    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                    <Header title="Create Questions" />
                    <TooltipComponent content="Add New" position="BottomCenter" >
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer hover:bg-light-gray rounded-lg flex items-center">
                                <IoIosAddCircle color="#4ade80" className='w-8 h-6' />
                                <p className="text-green-400 font-medium text-base" onClick={addNewTopic}>Add New</p>
                            </div>
                        </div>
                    </TooltipComponent>
                </div>

                {topics.map((topic, index) => (
                    <div key={index} className="mb-5">
                        {index !== 0 && <hr className="my-4 border-t border-gray-300" />} {/* Separator line */}
                        <div className="flex">
                        <p className="text-xl text-red-500 font-medium mb-3">* Note : </p>
                        <p className="text-lg font-normal mb-3 ml-1">Should not insert only image inside the editor</p>
                        </div>
                        <p className="text-xl font-medium mb-4 ml=1">Topic {index + 1}</p>
                        
                        <div className="flex items-center justify-between">
                          
                            <TextField
                                id={`category-${index}`}
                                select
                                label={`Select Topic ${index + 1}`}
                                value={topic.category}
                                onChange={(e) => handleCategoryChange(index, e.target.value)}
                                helperText="Please select Topics"
                                className="mt-6 w-60"
                            >
                                {categoryName.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option.topics}>
                                        {option.topics}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {index > 0 && (
                                <div className="cursor-pointer hover:bg-light-gray rounded-lg flex items-center" onClick={() => removeTopic(topic.id)}>
                                    <IoIosRemove color="#ef4444" className='w-6 h-6' />
                                    <p className="text-red-400 font-medium text-base">Remove</p>
                                </div>
                            )}
                        </div>

                        <p className="text-xl font-medium mt-4">Scenario</p>
                        <RichTextEditorComponent
                            ref={editorRef}
                            value={topic.scenario}
                            placeholder="Enter your Scenario here..."
                            onPaste={(e) => e.preventDefault()}
                            insertImageSettings={{
                                display: 'inline',
                                saveUrl: `${Host}/uploadImage`,
                                path: `${Host}/serveImage/`,
                            }}
                            pasteCleanupSettings={{
                                prompt: false
                            }}


                            created={() => {
                                editorRef.current.element.addEventListener("input", () => handleScenarioChange(index, editorRef.current.getHtml()));
                            }}

                        >

                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>

                        <p className="text-xl font-medium mt-4">Scenario Question 1</p>
                        <RichTextEditorComponent
                            ref={question1Refs.current[index]}
                            value={topic.question1}
                            onChangehange={(e) => handleQuestionChange(index, e, 'question1')}
                            placeholder="Enter your Scenario1 here..."
                            onPaste={(e) => e.preventDefault()}
                            insertImageSettings={{
                                saveUrl: `${Host}/uploadImage`,
                                path: `${Host}/serveImage/`,
                            }}
                            pasteCleanupSettings={{
                                prompt: false
                            }}
                            created={() => {
                                question1Refs.current[index].current.element.addEventListener("input", () => handleQuestionChange(index, question1Refs.current[index].current.getHtml(), 'question1'));
                            }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>

                        <p className="text-xl font-medium mt-4">Question 1 Key</p>
                        <RichTextEditorComponent
                            ref={question_1_keyRefs.current[index]}
                            value={topic.question_1_key}
                            onChange={(e) => handleQuestionChange(index, e.target.value, 'question1')}
                            placeholder="Enter your Scenario1 here..."
                            onPaste={(e) => e.preventDefault()}
                            insertImageSettings={{
                                // allowedTypes: ['.jpeg', '.jpg', '.png'],
                                display: 'inline',
                                saveUrl: `${Host}/uploadImage`,
                                path: `${Host}/serveImage/`,
                            }}
                            pasteCleanupSettings={{
                                prompt: false
                            }}
                            created={() => {
                                question_1_keyRefs.current[index].current.element.addEventListener("input", () => handleQuestionChange(index, question_1_keyRefs.current[index].current.getHtml(), 'question_1_key'));
                            }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>
                        <p className="text-xl font-medium mt-4">Scenario Question 2</p>
                        <RichTextEditorComponent
                            ref={question2Refs.current[index]}
                            value={topic.question2}
                            onChange={(e) => handleQuestionChange(index, e.target.value, 'question2')}
                            placeholder="Enter your Scenario2  here..."
                            onPaste={(e) => e.preventDefault()}
                            insertImageSettings={{
                                // allowedTypes: ['.jpeg', '.jpg', '.png'],
                                display: 'inline',
                                saveUrl: `${Host}/uploadImage`,
                                path: `${Host}/serveImage/`,
                            }}
                            pasteCleanupSettings={{
                                prompt: false
                            }}
                            created={() => {
                                question2Refs.current[index].current.element.addEventListener("input", () => handleQuestionChange(index, question2Refs.current[index].current.getHtml(), 'question2'));
                            }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>
                        <p className="text-xl font-medium mt-4">Question 2 Key</p>
                        <RichTextEditorComponent
                            ref={question_2_keyRefs.current[index]}
                            value={topic.question_2_key}
                            onChange={(e) => handleQuestionChange(index, e.target.value, 'question1')}
                            placeholder="Enter your Scenario2 here..."
                            onPaste={(e) => e.preventDefault()}
                            insertImageSettings={{
                                // allowedTypes: ['.jpeg', '.jpg', '.png'],
                                display: 'inline',
                                saveUrl: `${Host}/uploadImage`,
                                path: `${Host}/serveImage/`,
                            }}
                            pasteCleanupSettings={{
                                prompt: false
                            }}
                            created={() => {
                                question_2_keyRefs.current[index].current.element.addEventListener("input", () => handleQuestionChange(index, question_2_keyRefs.current[index].current.getHtml(), 'question_2_key'));
                            }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>
                        <p className="text-xl font-medium mt-4">Scenario Question 3</p>
                        <RichTextEditorComponent
                            ref={question3Refs.current[index]}
                            value={topic.question3}
                            onChange={(e) => handleQuestionChange(index, e.target.value, 'question3')}
                            placeholder="Enter your Scenario3 here..."
                            onPaste={(e) => e.preventDefault()}
                            insertImageSettings={{
                                // allowedTypes: ['.jpeg', '.jpg', '.png'],
                                display: 'inline',
                                saveUrl: `${Host}/uploadImage`,
                                path: `${Host}/serveImage/`,
                            }}
                            pasteCleanupSettings={{
                                prompt: false
                            }}
                            created={() => {
                                question3Refs.current[index].current.element.addEventListener("input", () => handleQuestionChange(index, question3Refs.current[index].current.getHtml(), 'question3'));
                            }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>
                        <p className="text-xl font-medium mt-4">Question 3 Key</p>
                        <RichTextEditorComponent
                            ref={question_3_keyRefs.current[index]}
                            value={topic.question_3_key}
                            onChange={(e) => handleQuestionChange(index, e.target.value, 'question1')}
                            placeholder="Enter your Scenario3 here..."
                            onPaste={(e) => e.preventDefault()}
                            insertImageSettings={{
                                // allowedTypes: ['.jpeg', '.jpg', '.png'],
                                display: 'inline',
                                saveUrl: `${Host}/uploadImage`,
                                path: `${Host}/serveImage/`,
                            }}
                            pasteCleanupSettings={{
                                prompt: false
                            }}
                            created={() => {
                                question_3_keyRefs.current[index].current.element.addEventListener("input", () => handleQuestionChange(index, question_3_keyRefs.current[index].current.getHtml(), 'question_3_key'));
                            }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>
                    </div>
                ))}

                <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
                    <Button variant="contained" onClick={handleSaveQuestions} disabled={!saveButtonActive}>Save Questions</Button> {/* Step 3 */}
                </Stack>
            </div>
        </>
    );
}

