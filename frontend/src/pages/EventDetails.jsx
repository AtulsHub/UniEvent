import EventDetail from '../components/EventDetail';
import { sampleEvent } from '../data/eventDummyData';

const EventDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UniEvent
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Events</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Calendar</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">My Events</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <EventDetail event={sampleEvent} />
      </main>
    </div>
  );
};

export default EventDetailPage;