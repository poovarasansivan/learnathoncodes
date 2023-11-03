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

export default function Editor() {
    return (
        <SideBarnav body={<Body />} />
    );
}

function Body() {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("user_id");
    const [categoryName, setcategoryName] = useState([]);
    const [editors, setEditors] = useState([<EditorComponent key={0} />]);
    console.log(categoryName);
    useEffect(() => {
        axios.get(`${Host}/GetCName`)
            .then((res) => {
                const eventNames = res.data.events.map(event => event.category_name);
                setcategoryName(eventNames);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const addNewEditor = () => {
        setEditors(prevEditors => [...prevEditors, <EditorComponent key={prevEditors.length} />]);
    };

    const removeEditor = (index) => {
        setEditors(prevEditors => prevEditors.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                    <Header title="Text Editor" />
                    <TooltipComponent content="Add New" position="BottomCenter" >
                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer p-1 hover:bg-light-gray rounded-lg flex items-center">
                                <IoIosAddCircle color="#4ade80" className='w-8 h-6' />
                                <p className="text-green-400 font-medium text-base" onClick={() => addNewEditor(editors.length + 1)}>Add New</p>
                            </div>
                            <div className="cursor-pointer p-1 hover:bg-light-gray rounded-lg flex items-center" onClick={() => removeEditor(editors.length - 1)}>
                                <IoIosRemove color="#ef4444" className='w-8 h-6' />
                                <p className="text-red-400 font-medium text-base">Remove</p>
                            </div>
                        </div>
                    </TooltipComponent>

                </div>
                <div>
                    <div className="mb-5">
                        <TextField
                            id="outlined-required"
                            select
                            label="Select Category"
                            // defaultValue="Select"
                            helperText="Please select Category"
                            name="incharge"
                            // value={formData.incharge}
                            // onChange={handleInputChange}
                            className="w-48"
                        >
                            {categoryName.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <p className="text-xl font-medium mb-5">Scenario</p>
                    <RichTextEditorComponent placeholder="Enter your Scenario here...">
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                    </RichTextEditorComponent>
                </div>
                <div>
                    {editors.map((editor, index) => (
                        <div key={index} className="mt-5">
                            {editor}
                        </div>
                    ))}
                </div>
                <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
                    <Button variant="contained" >Save Questions</Button>
                </Stack>
            </div>
        </>
    );
}

function EditorComponent() {
    const editorRef = useRef(null);

    return (
        <>
            <label className="block text-xl font-medium mb-2">Scenario Questions</label>
            <RichTextEditorComponent
                ref={editorRef}
                placeholder="Enter your Scenario Questions here..."
            >
                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
        </>
    );
}
