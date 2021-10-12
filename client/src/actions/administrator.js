import { useCallback, useState } from "react";
import { useHttp } from "../hooks/http.hooks";
import { setUsers } from "../reducers/admReducer";
import { deleteDocAction, editDocs, setDocs } from "../reducers/docsReducer";

export const useAdm = () => {
    const [ready, setReady] = useState(false);
    const tokenLS = 'token';
    const {request} = useHttp();
    const getUsers = useCallback(sort => {
        return async dispatch => {
            try {
                const data = await request(`/api/users/?sort=${sort}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem(tokenLS)}`});
                if(data instanceof Error)
                    throw data;
                dispatch(setUsers(data.userS));
            } catch (error) {
                alert(error.message);
            }
        }
    }, [request]);
    const uploadDoc = async body => {
        try {
            if(!body.file.name)
                throw new Error('File is required.');
            const formData = new FormData();
            formData.append('title', body.title);
            formData.append('type', body.type);
            formData.append('owner', body.owner);
            formData.append('file', body.file);
            const data = await request('/api/docs/', 'POST', formData, {Authorization: `Bearer ${localStorage.getItem(tokenLS)}`});
            if(data instanceof Error)
                throw data;
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    }
    const getById = id => {
        return async dispatch => {
            try {
                setReady(false);
                const data = await request(`/api/docs/get/?id=${id}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem(tokenLS)}`});
                if(data instanceof Error)
                    throw data;
                dispatch(setDocs(data.files));
            } catch (error) {
                alert(error.message);
            }finally{
                setReady(true);
            }
        }
    }
    const editDoc = (body, hidePopup) => {
        return async dispatch => {
            try {
                if(!body.file.name)
                    throw new Error('File is required.');
                const formData = new FormData();
                formData.append('title', body.title);
                formData.append('type', body.type);
                formData.append('owner', body.owner._id);
                if(body.file?.size)
                    formData.append('file', body.file);
                else
                    formData.append('file', JSON.stringify(body.file));
                formData.append('fileId', body.fileId);
                const data = await request('/api/docs/', 'PUT', formData, {Authorization: `Bearer ${localStorage.getItem(tokenLS)}`});
                if(data instanceof Error)
                    throw data;
                dispatch(editDocs(data.file));
                hidePopup();
            } catch (error) {
                alert(error.message);
            }
        }
    }
    const deleteDoc = fileId => {
        return async dispatch => {
            try {
                const data = await request('/api/docs/', 'DELETE', {fileId}, {Authorization: `Bearer ${localStorage.getItem(tokenLS)}`});
                if(data instanceof Error)
                    throw data;
                dispatch(deleteDocAction(fileId));
                alert(data.message);
            } catch (error) {
                alert(error.message);
            }
        }
    }
    return {getUsers, uploadDoc, getById, ready, editDoc, deleteDoc};
}