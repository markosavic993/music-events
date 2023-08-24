import {useRouter} from "next/router";
import Layout from "@/components/layout";
import {API_URL} from "@/config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`,
        {
          method: 'DELETE'
        });

      const data = await res.json();

      if(!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events');
      }
    }
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt/> Edit Event
          </Link>
          <a className={styles.delete} href="#" onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image?.data?.attributes?.formats.medium.url} width={960} height={600}/>
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>

        <h3>Description:</h3>
        <p>{evt.description}</p>

        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events' className={styles.back}>{'<'} Go back</Link>
      </div>
    </Layout>
  )
}

// export async function getServerSideProps({query: {slug}}) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const event = await res.json();
//
//   return {
//     props: {
//       evt: event
//     }
//   };
// }

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?sort=date:asc&populate=*`)
  const events = (await res.json()).data.map(evt => evt.attributes);
  const paths = events.map((evt) => ({
    params: {slug: evt.slug}
  }))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params: {slug}}) {
  const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`)
  const event = (await res.json()).data.map(evt => ({...evt.attributes, id: evt.id}))[0];

  return {
    props: {
      evt: event
    },
    revalidate: 1
  };
}
