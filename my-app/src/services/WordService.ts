
import { useContext } from "react";
import { UserContext } from "../App";
import { CurUser, PartProps, WordItem } from "../types";
import { API_URL, ENDPOINTS, WORD_STATUS } from "../utils/Constants";
 

export async function getWords() {
        try {
            const words = await fetch(`${API_URL}${ENDPOINTS.WORDS}`, {
              method: 'GET'
            });
            return await words.json();
        }
        catch(e) {
          console.log('error', e);
        }
    }

export const getPartOfTextbook = async(pageNumber: string | undefined, partNumber: string | undefined ) =>{
  const page = await fetch(`${API_URL}${ENDPOINTS.WORDS}?${ENDPOINTS.PAGE}${pageNumber}&${ENDPOINTS.GROUP}${partNumber}`,{
    method: 'GET',
  });
  return page.json();
}
  //https://<your-app-name>.herokuapp.com/words?page=2&group=0

export const getUserToken = () => {
  const LS=localStorage.getItem('CurrentUser'||'{}');
  if(LS){
    return JSON.parse(LS).token;
  }
}
export const getRefreshToken = () => {
  const LS=localStorage.getItem('CurrentUser'||'{}');
  if(LS){
    return JSON.parse(LS).refreshToken;
  }
}

export const getUserId = () => {
  const LS=localStorage.getItem('CurrentUser'||'{}');
  if(LS){
    return JSON.parse(LS).userId;
  }
}

export const getNewToken = async () => {
  const userId = getUserId();
  const refreshToken = getRefreshToken();
  const res = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.TOKENS}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
}})
   const answ = await res.json();
   return answ;
}

 interface BodyReq{
  "difficulty": string,
  "optional": { 
'group':string,
'page':string }
 }


 export const createHardWord = async ({ userId, wordId, word, wordStatus }:{userId: string, wordId: string, word: WordItem, wordStatus: string }) => {
    const token = getUserToken();
    console.log(token)
    const bodyReq: BodyInit = JSON.stringify({
      "difficulty": `${wordStatus}`,
      "optional": {
            'group':`${word.group}`,
             'page':`${word.page}` 
               }
    })
   
    const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
      method: 'POST',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:  bodyReq
    })    
      .then(async(response) =>{
          if ((response.status===401)||(response.status===422)){
            const newToken = await getNewToken();
            const LS = localStorage.getItem('CurrentUser'||'{}');
            const newDataUser: CurUser = {};
            if(LS){
                newDataUser.message = JSON.parse(LS).message;
                newDataUser.userId = JSON.parse(LS).userId;
                newDataUser.name = JSON.parse(LS).name;
                newDataUser.token = JSON.parse(newToken).token;
                newDataUser.refreshToken = JSON.parse(newToken).refreshToken;
            }
           // localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
           // userContext.dispatchUserEvent("UPDATE_USER", newDataUser);

            const newRes = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${newToken.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "difficulty": 'hard',
                "optional": { 
              'group':`${word.group}`,
              'page':`${word.page}` }
              })
            }) 
            return response;
          }
     })
     .catch((error) => {
      console.log(error)
        });

        console.log(rawResponse)
      return rawResponse;
  };

  
  export const deleteHardWord = async ({ userId, wordId}:{userId: string, wordId: string}) => {
    const token = getUserToken();
    const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })    
    return rawResponse
  }