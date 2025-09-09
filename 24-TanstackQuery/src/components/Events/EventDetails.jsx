import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id }, { signal }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: delteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"], refetchType: "none" });
      navigate("/events");
    },
  });

  function handleStopDeleting() {
    setIsDeleting(false);
  }

  function handleStartDeleting() {
    setIsDeleting(true);
  }

  function handleDelete() {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-detail-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-detail-content" className="center error">
        <ErrorBlock title="Failed to load event" message={error.info?.message || "Failed to fetch event data, please try again later."} />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDeleting}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStartDeleting}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? This process cannot be undone.</p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button className="button-text" onClick={handleStopDeleting}>
                  Cancel
                </button>
                <button className="button" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock title="Failed to delete event" message={delteError.info?.message || "Failed to delete event, please try again later."} />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
