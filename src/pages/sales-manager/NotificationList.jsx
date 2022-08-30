import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { clearNotificationDetail } from "store/notification"
import { fetchNotifDetails, fetchNotificationList } from "middlewares/notification";
import Notification from "./Notification";
import styled from "styled-components";

export default function NotificationList() {
	const dispatch = useDispatch();
	const { t } = useTranslation(); 
	const [activeId, setActiveId] = useState(null);
	const { notifications } = useSelector((state) => state.notification);
	useEffect(() => {
		dispatch(fetchNotificationList());
	}, [dispatch]);

	const clickHandler = (id, notificationId) => {
		if (id !== activeId) {
			dispatch(clearNotificationDetail());
			dispatch(fetchNotifDetails(notificationId));
			setActiveId(id);
		} else {
			dispatch(clearNotificationDetail());
			setActiveId(null);
		}
	};

	return (
		<Fragment>
			<Header>
				<h1>{t("headers.notifications")}</h1>
			</Header>
			<ul className="notif_list scroll">
				{notifications && notifications.map((notification, index) => (
					<Notification data={notification} key={index} active={activeId}
						clickHandler={(id) => clickHandler(id, notification.id)}
					/>
				))}
			</ul>
		</Fragment>
	);
}

const Header = styled.header`
	margin-top: -2rem;
	padding: 1.5em;
	border-bottom: 1px solid #dfdfdf;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);

	h1 {
		font-weight: 600;
		font-size: 20px;
		color: #333333;
		letter-spacing: 0.01em;
	}
`;
