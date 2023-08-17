import React, {Fragment, useEffect, useState, useCallback} from "react";
import consequnceService from "../../services/consequenceService";
import { useNavigate } from "react-router-dom";
import {Row} from "react-bootstrap"
import ConsequenceCard from "./ConsequenceCard";
import 'rc-pagination/assets/index.css';
import locale from "rc-pagination/lib/locale/en_US"
import Pagination from "rc-pagination";

function ConsequencesPage (props){
    const[pageData, setPageData] = useState({
        pageIndex: 1,
        pageSize: 6,
        totalFound: 0,
        consComponenet: []
    });

    const navigate = useNavigate()

    useEffect(()=>{
        consequnceService.paginateConsequences(pageData.pageIndex-1, pageData.pageSize).then(onPaginateSuccess).catch(onPaginateError);
    },[pageData.pageIndex]);

    const onEditClicked = useCallback((consequence)=>{
        const payloadForTransport = {type: "Cons_type", payload: consequence};
        const idForEdit = consequence.id;
        navigate(`form/${idForEdit}`, {state: payloadForTransport})
    },[]);

    const mapConsequences = (aConsequence)=>{
        return (<ConsequenceCard consequence = {aConsequence} currentUser={props}  key={aConsequence.id} onEditClicked={onEditClicked}></ConsequenceCard>)
    };

    const onPaginateSuccess=(response)=>{
        const data = response.item.pagedItems;
        const tc = response.item.totalCount
        setPageData((prevState)=>{
            const pd = {...prevState};
            pd.totalFound = tc;
            pd.consComponenet = data.map(mapConsequences)
            return pd;
        })
    };

    const onPaginateError=()=>{    
    };

    const onChangePage=(page)=>{
        setPageData((prevState)=>{
            const pd = {...prevState};
            pd.pageIndex = page;
            return pd;
        })
    };

    const onAddClicked=(e)=>{
        e.preventDefault();
        navigate(`form`)
    };

    return(
        <Fragment>
            <Row>
                <button className="btn btn-primary w-50 mx-auto" style={{marginBottom: 10}} onClick={onAddClicked}>Add Consequence</button>
                <div className="container">
                    <div className="row">{pageData.consComponenet}</div>
                </div>
            </Row>
            <Pagination
            className="text-center"
            onChange={onChangePage}
            current={pageData.pageIndex}
            total={pageData.totalFound}
            locale={locale}
            pageSize = {pageData.pageSize}></Pagination>
        </Fragment>
    )
}
export default ConsequencesPage;
