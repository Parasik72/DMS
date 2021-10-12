import { useCallback, useState } from "react";
import { useHttp } from "../hooks/http.hooks";
import { setDocs } from "../reducers/docsReducer";

export const useDocs = () => {
    const tokenLS = 'token';
    const {request} = useHttp();
    const [ready, setReady] = useState(false);
    const getDocs = useCallback(() => {
        return async dispatch => {
            try {
                setReady(false)
                const data = await request('/api/docs/', 'GET', null, {Authorization: `Bearer ${localStorage.getItem(tokenLS)}`});
                if(data instanceof Error)
                    throw data;
                dispatch(setDocs(data.files));
            } catch (error) {
                alert(error.message);
            }finally{
                setReady(true);
            }
        }
    }, [request]);

    const download = async (file) => {
        try {
            if(!file)
                throw new Error('Document was not found.');
            const response = await fetch(`/api/docs/download/?id=${file._id}`, {method: 'GET', body: null, headers:{Authorization: `Bearer ${localStorage.getItem(tokenLS)}`}});
            if(response.ok){
                const blob = await response.blob();
                const linkUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = linkUrl;
                link.download = file.fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (error) {
            alert(error.message);
        }
    }
    return {getDocs, download, ready};
}