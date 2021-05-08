import ChooseOrganization from "./components/ChooseOrganization"
import styles from './styles/app.module.scss'
import { useState, useEffect } from 'react';
import Input from './components/Input';
import Table from './components/Table';
import {getOrganizationRepos} from './api/git';
import Loader from './components/Loader';

const App = () => {
  const [organization, setOrganization] = useState('');
  const [tableData, setTableData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const charts = ['Scatter dot plot','Timeline plot', 'Most frequently mentioned topics'];


  useEffect(async () => {
    async function fetchRepos() {
      const repos = await getOrganizationRepos(organization);

      if(repos) {
        setDataLoading(false);
        setTableData(formatRepoDataForTable(repos))
      }
    }

    if(organization) {
      setDataLoading(true);
      fetchRepos();
    }

  },[organization]);

  const formatRepoDataForTable = (repos) => {
    return repos.map(repo => {
      return {
        repo:repo.name,
        stars:repo.stargazers_count,
        issues:repo.open_issues_count
      }
    });    
  }

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
                <span className={styles.label}> Minimum / maximum open issues</span>
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
            {dataLoading &&
              <div className={`${styles["loading-container"]}`}>
                <Loader size={32} borderSize={8}/>
              </div>
            }
            {!dataLoading &&
              <div className={styles["table-container"]}>
                <Table data={tableData} />
              </div>
            }
          </div>
          {/* Right side */}
          <div className={styles['repo-chart-contanier']}>  
            {/* Control */}
            <div style={{width:320}}  className={styles["control-container"]}>  
              <span className={styles.label} >Choose organization chart</span>          
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
