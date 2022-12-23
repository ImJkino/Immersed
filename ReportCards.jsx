import React, { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types"
import debug from "sabio-debug";
import "./traceabilityeventcard.css";

const _logger = debug.extend("eventsard")


function ReportsCard(props) {

    _logger("EventsCardProps---->", props)

    const report = props.report;

    const date = report.dateCreated;

    return (
        <Fragment>
            <ListGroup>
                <ListGroup.Item>
                    <strong>Event Name:</strong> {report.eventType.name}
                    <ListGroup.Item>
                        <strong>Trainee ID: </strong> {report.traineeId.id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Trainee Account Username: </strong> {report.traineeAccountId.username}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Subject:</strong> {report.subject}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description:</strong> {report.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Zone Name:</strong> {report.zoneId.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Date Form Was Created:</strong> {date}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Created By:</strong> {report.userId.firstName} {report.userId.lastName}
                    </ListGroup.Item>
                </ListGroup.Item>
                <span className="brSmall-event"></span>
            </ListGroup>
        </Fragment>
    )
};

ReportsCard.propTypes = {
    report: PropTypes.shape({
        eventType: PropTypes.shape({
            name: PropTypes.string,
        }).isRequired,
        subject: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        dateCreated: PropTypes.instanceOf(Date).isRequired,
        traineeId: PropTypes.shape({
            id: PropTypes.number,
        }).isRequired,
        traineeAccountId: PropTypes.shape({
            username: PropTypes.string,
        }).isRequired,
        zoneId: PropTypes.shape({
            name: PropTypes.string,
        }).isRequired,
        userId: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        }).isRequired,
    }),
}

export default ReportsCard;
