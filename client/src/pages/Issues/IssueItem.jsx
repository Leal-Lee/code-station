import React, { useState } from 'react'
import stytles from '../../css/IssueItem.module.css'
import { formatDate } from '../../utils/tool'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTypeList } from '../../redux/typeSlice'
import { Tag } from 'antd'
import { getUserById } from '../../api/user'


export default function IssueItem(props) {
    const colorArr = ['#f50', '#2db7f5', '#87d068', '#108ee9', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({})
    const { typeList } = useSelector(state => state.type)
    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList())
        }
        async function fetchData() {
            const { data } = await getUserById(props.issueInfo.userId)
            setUserInfo(data)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const type = typeList.find(item => item._id === props.issueInfo.typeId)

    return (
        <div className={stytles.container}>
            {/* 问答数 */}
            <div className={stytles.issueNum}>
                <div>{props.issueInfo.commentNum}</div>
                <div>回答</div>
            </div>
            {/* 浏览数 */}
            <div className={stytles.issueNum}>
                <div>{props.issueInfo.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 问题内容 */}
            <div className={stytles.issueContainer}>
                <div className={stytles.top}>{props.issueInfo.issueTitle}</div>
                <div className={stytles.bottom}>

                    <div className={stytles.left}>
                        <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
                            {type?.typeName}

                        </Tag>
                    </div>
                    <div className={stytles.right}>
                        <Tag color='volcano'>
                            {userInfo.nickname}

                        </Tag>
                        <span> {formatDate(props.issueInfo.issueDate, 'year')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
