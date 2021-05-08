import React,{useEffect} from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'

import makeData from './temp'

const Styles = styled.div`
  .repo-header{
    text-align: left;
    padding: 0px 10px;
  }
  .issues-header{
    width:150px;
    text-align:right;
    padding: 0px 10px;
  }
  .stars-header{
    text-align:right;
    padding: 0px 10px;
  }
  .repo-cell{
    text-align: left;
    padding: 15px 10px;
  }
  .issues-cell{
    text-align:right;
    padding: 15px 10px;
  }
  .stars-cell{
    text-align:right;
    padding: 10px 10px;
  }
  table {
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
        }
      }
    }

    th {
      border-bottom: solid 1px black;
      font-weight:500;
      font-size:15px;
    }
    td {
      font-weight:400;
      border-bottom:solid 1px #D3D3D3;
      background-color: white;
      padding: 20px 20px;
      :last-child {
      }
    }
    th,
    td {
      margin: 0;

    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

function CreateTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize:5 },
    },
    usePagination
  )
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                // console.log(column)
                
                let className;
                if(column.id === 'repo') {
                  className = 'repo-header'
                }
                if(column.id === 'issues') {
                  className = 'issues-header'
                }
                if(column.id === 'stars') {
                  className = 'stars-header'
                }
                return (<th className={className} {...column.getHeaderProps()}>{column.render('Header')}</th>)
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  let className;
                  if(cell.column.id === 'repo') {
                    className = 'repo-cell'
                  }
                  if(cell.column.id === 'issues') {
                    className = 'issues-cell'
                  }
                  if(cell.column.id === 'stars') {
                    className = 'stars-cell'
                  }
                  return <td className={className} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* Pagination component */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
      
    </>
  )
}

function Table({data}) {

  useEffect(() => {
    console.log(data);
  }, [data]);


  const columns = React.useMemo(
    () => [
        {
          Header: 'Repository',
          accessor: 'repo',

        },
        {
          Header: 'Open Issues',
          accessor: 'issues',
        },
        {
          Header: 'Stars',
          accessor: 'stars',

        }
      ],
    []
  )

  return (
    <Styles>
      <CreateTable columns={columns} data={data} />
    </Styles>
  )
}

export default Table
