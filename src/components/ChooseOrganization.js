import styles from './styles/topbar.module.scss';
import Input from './Input';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {GIT_ACCESS_TOKEN} from '../config/config.json'

//TODO place this element in appropriate spot
const ChooseOrganization = ({setOrganization}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  //TODO 
  // export access token
  const goodURL = `https://api.github.com/search/users?q=${searchQuery}+in:login+type:org&page=1`;

  useEffect(() => {
    console.log(GIT_ACCESS_TOKEN);
    if(searchQuery.length>0) {
      axios({
        method: "get",
        url :`https://api.github.com/search/users?q=${searchQuery}+in:login+type:org&page=1`,
        headers: {
            Authorization: `Bearer ${GIT_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
          },
        })
        .then((response) =>{
        const suggestions = response.data.items.map((item) => {
          return item.login;
        })
        setSuggestions(suggestions);
        // Set suggestions here
      })
      .catch((error)=> {
        console.log(error);
      })
    }

  },[searchQuery]);

  const onSuggestionSelect = (suggestion) => {
    setOrganization(suggestion);
  }
  
  return (
    <div className={styles.container}>
      <div  className={styles['input-container']}>
        <Input 
          withSuggestions={true}
          value={searchQuery} 
          onInput={setSearchQuery} 
          placeholder={'Search organizations'} 
          autocompleteSuggestions={suggestions}
          onSuggestionSelect={onSuggestionSelect}
          width={'100%'}
        />
      </div>
    </div>
  );
}
  
  export default ChooseOrganization;
  