import Link from 'next/link';

export default function Events() {
  const events = [
    {
      title: "From Figma to Flutter Practical Workflow",
      date: "20 Feb 2026",
      location: "Online Workshop"
    },
    {
      title: "Flutter Meetup - Kanpur",
      date: "28 Feb 2026",
      location: "Kanpur, India"
    }
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Events</h3>
        <Link href="/event2" className="text-blue-600 text-sm">View All</Link>
      </div>
      <div className="space-y-4">
        {events.map((event, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
            <Link href={`/event2/${event.id}`} className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded">
              Know more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}