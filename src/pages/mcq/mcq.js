import React, { useState, useEffect, useRef } from "react";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import Host from "../../components/api";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { IoIosAddCircle, IoIosRemove } from "react-icons/io";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import SideBarnav from "../../components/sideBarnav";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function MCQ() {
    return (
        <SideBarnav body={<Body />} />
    )
}

function Body() {

    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }

    const [saveButtonActive, setSaveButtonActive] = useState(true);
    const [currentTopic, setCurrentTopic] = useState(1);
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correct_ans, setAnswer] = useState('');
    const [topics, setTopics] = useState([
        {
            id: 0,
            question: "",
            options: {
                option1: "",
                option2: "",
                option3: "",
                option4: "",
            },
            correct_ans: "",
        },
    ]);

    const questionRefs = useRef(topics.map(() => React.createRef()));
    const addNewTopic = () => {
        if (topics.length < 100) {
            const newTopicId = currentTopic + 1;
            const newTopic = {
                id: newTopicId,
                question: "",
                options: {
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                },
                correct_ans: "",
            };
            setTopics((prevTopics) => [...prevTopics, newTopic]);
            setCurrentTopic(newTopicId);
            questionRefs.current.push(React.createRef());
        }
    };


    const removeTopic = (id) => {
        if (topics.length > 1) {
            setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));
            questionRefs.current.splice(id - 1, 1);
        }
    };

    const handleQuestionChange = (index, value) => {
        const updatedTopics = [...topics];
        updatedTopics[index].question = value; // Update 'question' instead of 'scenario'
        setTopics(updatedTopics);
    };
    const handleOptionChange = (index, optionKey, value) => {
        const updatedTopics = [...topics];
        // Ensure options are initialized before updating
        updatedTopics[index].options = updatedTopics[index].options || {};
        updatedTopics[index].options[optionKey] = value;
        setTopics(updatedTopics);
    };


    const handleCorrectAnsChange = (index, value) => {
        const updatedTopics = [...topics];
        updatedTopics[index].correct_ans = value;
        setTopics(updatedTopics);
    };

    const resetTopics = () => {
        const initialTopics = [
            {
                id: 0,
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correct_ans: "",
            },
        ];
        setTopics(initialTopics);
        setCurrentTopic(1);
        questionRefs.current = initialTopics.map(() => React.createRef());

    };
    const handleSaveMcq = () => {
        if (saveButtonActive) {
            const updatedState = topics.map((topic) => ({
                question: topic.question,
                options: {
                    option1: topic.options.option1,
                    option2: topic.options.option2,
                    option3: topic.options.option3,
                    option4: topic.options.option4,
                },
                correct_ans: topic.correct_ans,
                created_by: sessionStorage.getItem("user_id")
            }));

            const dataToSave = updatedState.map((topic) => ({
                question: topic.question,
                option1: topic.options.option1,
                option2: topic.options.option2,
                option3: topic.options.option3,
                option4: topic.options.option4,
                correct_ans: topic.correct_ans,
                created_by: sessionStorage.getItem("user_id")
            }));
            var status = 1;
            updatedState.forEach((element) => {
                if (element.category === 0 || element.category === "") {
                    status = 0;
                    return;
                }
            });
            if (status === 1) {
                axios.post(`${Host}/McqQuestions`, dataToSave)
                    .then((response) => {
                        resetTopics();
                        setOption1('');
                        setOption2('');
                        setOption3('');
                        setOption4('');
                        setAnswer('');
                    })
                    .catch((error) => {
                        console.error("Error inserting data:", error);
                    });
            }
        } else {
            console.log("time over");
        }
    };
    useEffect(() => {
        const fetchButtonStatus = () => {
            axios.get(`${Host}/ButtonStatus`)
                .then((res) => {
                    let data = res.data;
                    // console.log(data)
                    const buttonStatus = data.events[0].save_mcq === 1;
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
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">MCQ Question</h1>
                    <TooltipComponent content="Add New" position="BottomCenter">
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
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-medium mt-4">MCQ {index + 1}</p>
                            {index > 0 && (
                                <div className="cursor-pointer hover:bg-light-gray rounded-lg flex items-center" onClick={() => removeTopic(topic.id)}>
                                    <IoIosRemove color="#ef4444" className='w-6 h-6' />
                                    <p className="text-red-400 font-medium text-base">Remove</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            
                            <RichTextEditorComponent
                                ref={questionRefs.current[index]}
                                value={topic.question}
                                onChange={(e) => handleQuestionChange(index, e)}
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
                                    questionRefs.current[index].current.element.addEventListener("input", () => handleQuestionChange(index, questionRefs.current[index].current.getHtml()));
                                }}
                                style={{ maxWidth: '1400px', maxHeight: '200px', overflowY: 'auto' }}
                            >
                                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                            </RichTextEditorComponent>
                        </div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className='mt-5'>
                                <TextField
                                    required
                                    label={"Option 1"}
                                    id={`option1-${index}`}
                                    value={topic.options.option1}
                                    onChange={(e) => handleOptionChange(index, 'option1', e.target.value)}
                                />
                                <TextField
                                    required
                                    label={"Option 2"}
                                    id={`option2-${index}`}
                                    value={topic.options.option2}
                                    onChange={(e) => handleOptionChange(index, 'option2', e.target.value)}
                                />
                                <TextField
                                    required
                                    label={"Option 3"}
                                    id={`option3-${index}`}
                                    value={topic.options.option3}
                                    onChange={(e) => handleOptionChange(index, 'option3', e.target.value)}
                                />
                                <TextField
                                    required
                                    label={"Option 4"}
                                    id={`option4-${index}`}
                                    value={topic.options.option4}
                                    onChange={(e) => handleOptionChange(index, 'option4', e.target.value)}
                                />
                                <TextField
                                    required
                                    label={"Answer Key"}
                                    id={`answerkey-${index}`}
                                    value={topic.correct_ans}
                                    onChange={(e) => handleCorrectAnsChange(index, e.target.value)}
                                />
                            </div>
                        </Box>
                    </div>
                ))}
                <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
                    <Button variant="contained" onClick={handleSaveMcq} disabled={!saveButtonActive}>Save MCQ</Button>
                </Stack>
            </div>
        </>
    )
}
