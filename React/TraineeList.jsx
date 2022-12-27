import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types"
import traineesService from "services/traineesService";
import { Row, Table, Col } from "react-bootstrap";
import UserTable from "../../components/traceability/ReportsTable";
import toastr from "toastr";

function Trainee(props) {
    const userId = props.currentUser.id;

    const [traineeData, setTraineeData] = useState({
        traineeComponent: []
    });



    useEffect(() => {
        traineesService.getTraineesByUserId(userId).then(onGetTraineeByUserSuccess).catch(onGetTraineeByUserError);
    }, [])

    const onGetTraineeByUserSuccess = (response) => {
        const traineeArray = response.items;
        setTraineeData((prevState) => {
            let pd = { ...prevState }
            pd.traineeComponent = traineeArray.map(mapTrainees)
            return pd;
        })
    };

    const mapTrainees = (aTrainee) => {
        return <UserTable trainee={aTrainee} key={aTrainee.id} ></UserTable>
    }

    const onGetTraineeByUserError = () => {
        toastr.error("Error Getting Trainees")
    }



    return (
        <Fragment>
            <Row className="col-md-12 mx-auto justify-content-center">
                <Col className="col-md-6">
                    <Table>
                        <thead>
                            <tr>
                                <th>Trainee</th>
                                <th>Training Unit</th>
                                <th>Select Trainee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {traineeData.traineeComponent}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Fragment>
    )
};

Trainee.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number.isRequired
    })
}

export default Trainee;
