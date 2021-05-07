import styles from './styles/input.module.scss';
import { useState, useRef, useEffect } from 'react';

const Input = ({value, onInput, placeholder, autocompleteSuggestions, onSuggestionSelect, withSuggestions, dropdown, dropdownOptions, width}) => {

  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener("mousedown",handleClickOutside)
    }
  });

  const handleClickOutside = event => {
    const {current: wrap } = wrapperRef;
    if(wrap && !wrap.contains(event.target)) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  }

  // To do:
  // export component with input and autoselect input being seperate component
  const inputType = () => {
    if(withSuggestions) {
      return (
        <div ref={wrapperRef} className={styles["input-container"]}>
          <input
            style={{width: width}} 
            value={value}     
            onChange={(event)=>{
            onInput(event.target.value);
            }}
            className={styles.input} 
            type="text" 
            placeholder={placeholder} 
          />
    
          {
            (autocompleteSuggestions && showSuggestions ) &&
            <div className={styles["suggestions-container"]}>
              {autocompleteSuggestions.map((suggestion, i) => {
                return(
                  <div className={(i === 0 || i === autocompleteSuggestions.length - 1 ) ?
                  `${styles['suggestion-container-round']} ${styles['suggestion-container']}` : styles[`suggestion-container`]}
                  onClick={()=>{
                    onInput(suggestion);
                    onSuggestionSelect(suggestion);
                  }}
                  >
                    <span className={styles["suggestion"]}>{suggestion}</span>
                  </div> 
                )
              })}
            </div>
          }
      </div>
      );
    }
    
    if(dropdown){
      return(
          <div ref={wrapperRef} className={styles["input-container"]}>
            <div className={styles["dropdown-input-wraper"]}>
              <input
                style={{width: width, cursor:'pointer'}} 
                value={value}     
                onChange={(event)=>{
                onInput(event.target.value);
                }}
                className={styles.input} 
                type="text" 
                placeholder={placeholder} 
              />
              <img src={process.env.PUBLIC_URL + 'dropdown.svg'} alt="dropdown" className={styles['dropdown-icon']}/>
            </div>


            {
            // Should be exported in component
            (dropdownOptions && showSuggestions ) &&
            <div className={styles["suggestions-container"]}>
              {dropdownOptions.map((option, i) => {
                return(
                  <div className={(i === 0 || i === dropdownOptions.length - 1 ) ?
                  `${styles['suggestion-container-round']} ${styles['suggestion-container']}` : styles[`suggestion-container`]}
                  onClick={()=>{
                    onInput(option);
                    if(onSuggestionSelect){
                      onSuggestionSelect(option);
                    }
                  }}
                  >
                    <span className={styles["suggestion"]}>{option}</span>
                  </div> 
                )
              })
              }
            </div>
          }
        </div>
      );
    }
    
    if(!dropdown && !withSuggestions) {
      return (
        <input 
          style={{width: width}} 
          value={value}     
          onChange={(event)=>{
          onInput(event.target.value);
          }}
          className={styles.input} 
          type="text" 
          placeholder={placeholder} 
        />
      );
    }
  }

  return inputType();
}

export default Input;