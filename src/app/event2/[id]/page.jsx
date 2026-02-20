import Link from 'next/link';
import { notFound } from 'next/navigation';
import Event2Container from '@/components/event2/Event2Container';
import { EVENT2_LIST } from '@/data/events2';

export default function Event2ByIdPage({ params }) {
  const id = Number(params?.id);
  if (Number.isNaN(id)) return notFound();

  const event = EVENT2_LIST.find((e) => Number(e.id) === id);
  if (!event) return notFound();

  return (
    <div className="ev2-detail-wrapper">
      <header className="ev2-appbar">
        <Link href="/event2" className="ev2-back" aria-label="Back to Events">
          ←
        </Link>
        <h1 className="ev2-title">{event.title}</h1>
      </header>

      <main className="ev2-detail-content">
        <p className="ev2-card-datetime">{event.dateTimeLocation}</p>
        <p className="ev2-card-desc">{event.description}</p>
        <p>Status: {event.status}</p>
      </main>
    </div>
  );
}
