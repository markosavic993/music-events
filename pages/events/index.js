import Layout from "@/components/layout";
import {API_URL, PER_PAGE} from "@/config";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

     <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const res = await fetch(`${API_URL}/api/events?sort=date:asc&populate=*&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`)
  const data = await res.json();
  const events = data.data.map(evt => ({...evt.attributes, id: evt.id}));

  return {
    props: { events, page: +page, total: data.meta.pagination.total  }
  };
}
