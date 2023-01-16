import React ,{ useState ,useEffect} from 'react'
import PageHeader from '../../components/PageHeader'
import stytles from '../../css/Issue.module.css'
import {getIssueByPage} from '../../api/issue'
import IssueItem from './IssueItem'


export default function Issues() {

  const [pageInfo,setPageInfo]=useState({current:1,pageSize:15,total:0})
  const [issueInfo,setIssueInfo]=useState([])
  useEffect(()=>{
    async function fetchData(){
    const {data}=  await getIssueByPage({
        current:pageInfo.current,
        pageSize:pageInfo.pageSize,
        issueStatus:true
      })
     setIssueInfo(data.data)
     setPageInfo({
      current:data.current,
      pageSize:data.eachSize,
      total:data.count
     })
    }

    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageInfo.current, pageInfo.pageSize])

let issueList=[]
for(let i=0;i<issueInfo.length;i++){
 const issue= <IssueItem key={i} issueInfo={issueInfo[i]} />
issueList.push( issue)
}

  return (
    <div className={stytles.container}>
        {/* 头部 */}
        <PageHeader title='问答列表'/>
        {/* 列表 */}
        <div className={stytles.issueContainer}>
          {/* 左侧 */}
          { issueList}
        <div className={stytles.leftSide}></div>
        {/* 右侧 */}
        <div className={stytles.rightSide}></div>
        </div>
    </div>
  )
}
