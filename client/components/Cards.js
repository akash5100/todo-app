import React, { useState } from "react";
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Cards = ({ title, description, id, completed }) => {
    const [editMode, setEditMode] = useState(false);
    const [Title, setTitle] = useState(title);
    const [Description, setDescription] = useState(description);

    const handleDelete = async (id) => {
        axios.delete(`http://localhost:5000/v1/tasks/del/${id}`).then((response) => {
            console.log(response);
        });
    };

    const handleEdit = async (e, id) => {
        await axios
            .patch(`http://localhost:5000/v1/tasks/update/${id}`, {
                title: Title,
                description: Description,
            })
            .then((response) => {
                console.log(response);
            });
        setTitle(Title);
        setDescription(Description);
        setEditMode(false);
    };

    const handleComplete = async (id) => {
        await axios.patch(`http://localhost:5000/v1/tasks/complete/${id}`).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="relative group">
            <div className="h-24 w-fit p-7 hover:border-blue-500 rounded-lg border border-gray-300 m-3 flex flex-col justify-center items-center hover:text-green-600">
                {editMode ? (
                    <div className="hidden absolute bottom-0 right-0 -translate-x-3 -translate-y-3 group-hover:flex ">
                        <div className=" rounded h-6 w-6 hover:border hover:border-blue-400 p-1 ">
                            <CheckIcon
                                className="object-contain"
                                onClick={(e) => {
                                    handleEdit(e, id);
                                }}
                            />
                        </div>
                        <div className="mr-1 rounded h-6 w-6 hover:border hover:border-blue-400 p-1 ">
                            <XMarkIcon
                                onClick={() => {
                                    setEditMode(false);
                                    setTitle(title);
                                    setDescription(description);
                                }}
                                className="object-contain"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="hidden absolute top-0 right-0 -translate-x-3 translate-y-3 group-hover:flex ">
                        <div className=" rounded h-6 w-6 hover:border hover:border-blue-400 p-1 ">
                            <CheckIcon
                                className="object-contain"
                                onClick={() => {
                                    handleComplete(id);
                                }}
                            />
                        </div>
                        <div className=" rounded h-6 w-6 hover:border hover:border-blue-400 p-1 ">
                            <PencilIcon
                                className="object-contain"
                                onClick={() => {
                                    setEditMode(true);
                                }}
                            />
                        </div>
                        <div className="mr-1 rounded h-6 w-6 hover:border hover:border-blue-400 p-1 ">
                            <TrashIcon onClick={() => handleDelete(id)} className="object-contain" />
                        </div>
                    </div>
                )}
                <input
                    type="text"
                    disabled={!editMode}
                    className={`text-lg font-bold text-center bg-inherit ${completed ? "line-through" : ""}`}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={Title}
                />
                <input
                    type="text"
                    disabled={!editMode}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    className={`text-gray-500 text-center bg-inherit ${completed ? "line-through" : ""}}`}
                    value={Description}
                />
            </div>
        </div>
    );
};

export default Cards;
