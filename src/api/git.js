import axios from 'axios';
import {GIT_ACCESS_TOKEN} from '../config/config.json'

export const getOrganizationRepos = async (organization) => {
   return await axios({
        method: "get",
        url : `https://api.github.com/users/${organization}/repos?per_page=100`,
        headers: {
            Authorization: `Bearer ${GIT_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
          },
        })
        .then((response) => {
          return response.data;          
      },      
      ).catch((error)=>{
        console.log(error.response)
      })

}