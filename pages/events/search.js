import Layout from "@/components/layout";
import {API_URL} from "@/config";
import EventItem from "@/components/EventItem";
import qs from "qs";
import {useRouter} from "next/router";
import Link from "next/link";

export default function SearchPage({events}) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <h1>Search results for {router.query.term}</h1>
      <Link href='/events'>Go Back</Link>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          },
        },
        {
          performers: {
            $contains: term,
          },
        },
        {
          description: {
            $contains: term,
          },
        },
        {
          venue: {
            $contains: term,
          },
        },
      ]
    },
    populate: '*'
  }, {
    encodeValuesOnly: true, // prettify URL
  });

  console.log(query)

  const res = await fetch(`${API_URL}/api/events?${query}`)
  const events = (await res.json()).data.map(evt => ({...evt.attributes, id: evt.id}));

  return {
    props: {events}
  };
}
