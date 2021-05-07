import ChooseOrganization from "./components/ChooseOrganization"
import styles from './styles/app.module.scss'
import { useState, useEffect } from 'react';
import Input from './components/Input';
import Table from './components/Table';

const App = () => {
  const [organization, setOrganization] = useState('');
  const charts = ['Scatter dot plot','Timeline plot', 'Most frequently mentioned topics'];

  useEffect(() => {
    console.log(organization);
  },[organization]);

  return (
    <div className={styles.container}>
      {/* Topbar */}
      <div className={styles.topbar}>
        <ChooseOrganization setOrganization = {setOrganization}/>
      </div>
      {/* Show If title is selected */}
      {organization.length > 0 &&
      <div className={styles['organization-container']}>
        <h1>{organization}</h1>
        <div className={styles['content']} >
          {/* Left side */}
          <div className={styles['repo-list-container']}>
            {/* Control */}
            <div className={styles["list-controls-container"]}>
              <div className={styles["control-container"]}>
                <span >Filter repositories by name</span>
                <Input 
                width={'320px'} 
                value={'test'} 
                onInput={()=>{}} 
                placeholder={'Search organizations'}
                />
              </div>  

              <div className={styles["control-container"]}>
                <span className={styles.label} >Filter repositories by name</span>
                <div className={styles["issues-filters-container"]}>
                  <Input
                    width={'65px'} 
                    value={'test'} 
                    onInput={()=>{}} 
                    placeholder={'Search organizations'} 
                  />
                  <Input 
                    width={'65px'} 
                    value={'test'} 
                    onInput={()=>{}} 
                    placeholder={'Search organizations'} 
                  />
                </div>
              </div>
            </div>
            {/* Table */}
            <Table/>
          </div>
          {/* Right side */}
          <div className={styles['repo-chart-contanier']}>  
            {/* Control */}
            <div style={{width:320}}  className={styles["control-container"]}>  
              <span className={styles.label} >Filter repositories by name</span>          
                <Input 
                    width={320}
                    value={charts[0]} 
                    onInput={()=>{}} 
                    placeholder={'Search organizations'}
                    dropdown={true}
                    dropdownOptions={charts}
                />
            </div>
             {/* Chart */}
            <div>
             
            </div>
          </div>
        </div>
      </div>
      }
      {/* Show if title is not selected */}
      {organization.length < 1 &&
        <div className={styles['no-organization-container']}>
          <p>Search for an organization</p> 
        </div>
      }
    </div>
  );
}

export default App;
