import React, { useState, useEffect, useRef } from "react";
import SideBarnav from '../../components/sideBarnav';
import { Header } from '../../components';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, INSERT_COLUMN } from '@syncfusion/ej2-react-richtexteditor';
import Host from "../../components/api";
import { InsertChart } from "@material-ui/icons";

export default function MCQ() {
    return (
        <SideBarnav body={<Body />} />
    )
}

function Body() {
    const editorRef = useRef();

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                    <Header title="MCQ Question" />
                </div>
                <p className="text-xl font-medium mt-4">MCQ </p>
                        <RichTextEditorComponent
                            ref={editorRef}
                            // value={scenario}
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
                            // created={() => {
                            //     editorRef.current.element.addEventListener("input", () => handleScenarioChange(index, editorRef.current.getHtml()));
                            // }}
                            style={{ maxWidth: '1400px', maxHeight: '200px', overflowY: 'auto' }}
                        >
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>
            </div>
        </>
    )
}