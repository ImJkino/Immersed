import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./traceabilityeventcard.css";
import { useLocation } from "react-router-dom"


function UserTable(props) {

    const user = props.trainee.user;
    const trainee = props.trainee;
    const reportClick = props.onReportsClick;
    const eventClick = props.onViewEvents;
    const location = useLocation();

    const localReports = (e) => {
        reportClick(trainee, e);
    };

    const localEventsClicked = (e) => {
        eventClick(trainee, e)
    };

    return (
        <Fragment>
            {location.pathname.includes("/usertrainees/") ?
                <tr>
                    <td className="name-title-table">{trainee.id}</td>
                    <td>
                        <p className="name-title-table">{trainee.trainingUnits.name}</p>
                    </td>
                    <td>
                        <button className="btn btn-sm btn-primary">Select</button>
                    </td>
                </tr> :
                <tr>
                    <td className="name-title-table">{user.firstName} {user.lastName}</td>
                    <td>
                        {<button onClick={localReports} className="btn btn-sm btn-primary">View Reports</button>}
                    </td>
                    <td>
                        <button onClick={localEventsClicked} className="btn btn-sm btn-primary">View Events</button>
                    </td>
                </tr>
            }
        </Fragment >
    );
};

UserTable.propTypes = {
    trainee: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }),
        id: PropTypes.number.isRequired,
        trainingUnits: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    }),
    onReportsClick: PropTypes.func.isRequired,
    onViewEvents: PropTypes.func.isRequired,
};


export default UserTable;
