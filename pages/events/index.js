import Layout from "@/components/layout";
import {API_URL} from "@/config";
import EventItem from "@/components/EventItem";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?sort=date:asc&populate=*`)
  const events = (await res.json()).data.map(evt => ({...evt.attributes, id: evt.id}));

  return {
    props: { events },
    revalidate: 1
  };
}
