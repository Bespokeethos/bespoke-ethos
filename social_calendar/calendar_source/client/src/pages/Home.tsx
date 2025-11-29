import { useState, useMemo } from "react";
import { EVENTS, SCORE_DATA, Event } from "@/data/events";
import { cn } from "@/lib/utils";
import { Check, X, AlertTriangle, Trophy, Calendar, MapPin, Clock, Search, ChevronDown, Filter, Info, HelpCircle } from "lucide-react";

export default function Home() {
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "FAULTY">("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [showScoreDetails, setShowScoreDetails] = useState(false);

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const matchesFilter = filter === "ALL" || 
        (filter === "VERIFIED" && event.status === "VERIFIED") ||
        (filter === "FAULTY" && event.status === "FAULTY");
      
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === "ALL" || event.category === categoryFilter;

      return matchesFilter && matchesSearch && matchesCategory;
    });
  }, [filter, searchTerm, categoryFilter]);

  const groupedEvents = useMemo(() => {
    const groups: Record<string, Event[]> = {};
    
    filteredEvents.forEach(event => {
      let key = "Upcoming";
      if (event.date.includes("Weekly") || event.date.includes("Daily")) {
        key = "Recurring";
      } else {
        const date = new Date(event.date);
        if (!isNaN(date.getTime())) {
          key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        }
      }
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(event);
    });

    return groups;
  }, [filteredEvents]);

  // Custom sort order for months
  const sortedGroupKeys = Object.keys(groupedEvents).sort((a, b) => {
    if (a === "Recurring") return 1;
    if (b === "Recurring") return -1;
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const categories = ["ALL", ...Array.from(new Set(EVENTS.map(e => e.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-mono selection:bg-black selection:text-white">
      {/* HEADER WITH INTEGRATED SCOREBOARD */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div>
              <div className="mb-1 inline-block bg-black text-white px-2 py-0.5 font-bold text-[10px] md:text-xs rotate-[-2deg] shadow-[2px_2px_0px_0px_#FF00D6]">
                CONSENSUS ENGINE
              </div>
              <h1 className="text-xl md:text-2xl font-black uppercase leading-none tracking-tighter">
                AI Gauntlet <span className="text-[#FF00D6] hidden md:inline">Seasonal Social Calendar</span>
              </h1>
            </div>
            
            {/* Mobile Score Toggle */}
            <button 
              onClick={() => setShowScoreDetails(!showScoreDetails)}
              className="md:hidden p-2 border-2 border-black rounded bg-gray-100"
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Scoreboard Pill */}
          <div className="hidden md:flex items-center bg-gray-100 border-2 border-black rounded-full p-1 pr-4 gap-4 relative group">
            <div className="bg-black text-white px-3 py-1 rounded-full font-bold text-xs flex items-center gap-2">
              <Trophy className="w-3 h-3 text-yellow-300" />
              LEADERBOARD
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              {SCORE_DATA.sort((a, b) => a.rank - b.rank).map((model) => (
                <div key={model.model} className="flex items-center gap-1">
                  <span className={cn("w-2 h-2 rounded-full", model.rank === 1 ? "bg-yellow-400" : "bg-gray-400")}></span>
                  <span className="truncate max-w-[100px]">{model.model}</span>
                  <span className={cn(
                    "px-1.5 rounded text-[10px]",
                    model.score > 0 ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  )}>
                    {model.score > 0 ? "+" : ""}{model.score}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Hover Dropdown for Desktop */}
            <div className="absolute top-full right-0 mt-2 w-80 bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <h3 className="font-black uppercase mb-2 border-b-2 border-black pb-1">How Scoring Works</h3>
              <p className="text-xs mb-3 text-gray-600">
                Three AI models compete to find and verify events. Points are awarded for unique finds and accuracy.
              </p>
              <div className="space-y-2">
                {SCORE_DATA.map((model) => (
                  <div key={model.model} className="text-xs border-l-2 border-black pl-2">
                    <div className="font-bold flex justify-between">
                      <span className="truncate max-w-[180px]">{model.model}</span>
                      <span className={model.score > 0 ? "text-green-600" : "text-red-600"}>
                        {model.score > 0 ? "+" : ""}{model.score} pts
                      </span>
                    </div>
                    <p className="text-gray-500">{model.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Scoreboard Expandable */}
        {showScoreDetails && (
          <div className="md:hidden border-t-2 border-black bg-gray-50 p-4 animate-in slide-in-from-top-2">
             <h3 className="font-black uppercase mb-2 flex items-center gap-2">
               <HelpCircle className="w-4 h-4" />
               How Scoring Works
             </h3>
             <p className="text-xs mb-4 text-gray-600">
                Three AI models compete to find and verify events. Points are awarded for unique finds and accuracy.
              </p>
              <div className="grid grid-cols-1 gap-2">
                {SCORE_DATA.map((model) => (
                  <div key={model.model} className="bg-white border-2 border-black p-2 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold">{model.model}</span>
                      <p className="text-[10px] text-gray-500">{model.details}</p>
                    </div>
                    <span className={cn(
                      "font-black px-2 py-1",
                      model.score > 0 ? "bg-green-200" : "bg-red-200"
                    )}>
                      {model.score > 0 ? "+" : ""}{model.score}
                    </span>
                  </div>
                ))}
              </div>
          </div>
        )}
      </header>

      <main className="px-3 py-4 md:px-6 md:py-6 max-w-7xl mx-auto">
        
        {/* CONTROLS BAR */}
        <section className="mb-6 sticky top-[76px] z-40 bg-gradient-to-b from-yellow-50 via-yellow-50 to-transparent pb-4 pt-2 -mt-2">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-grow md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="brutal-input pl-9 w-full py-2 text-sm bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {["ALL", "VERIFIED", "FAULTY"].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={cn(
                    "brutal-btn py-1 px-3 text-xs font-bold whitespace-nowrap min-w-fit",
                    filter === status && (
                      status === "VERIFIED" ? "bg-green-400" : 
                      status === "FAULTY" ? "bg-red-400" : 
                      "bg-black text-white"
                    )
                  )}
                >
                  {status}
                </button>
              ))}
              <div className="w-px h-8 bg-black mx-1 hidden md:block"></div>
              {categories.slice(0, 4).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "brutal-badge cursor-pointer hover:bg-yellow-300 text-[10px] py-1 px-2 whitespace-nowrap flex items-center",
                    categoryFilter === cat ? "bg-yellow-300" : "bg-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS GRID GROUPED BY MONTH */}
        <section className="space-y-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white border-4 border-black border-dashed">
              <p className="font-bold text-lg">No events found</p>
              <p className="text-sm text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            sortedGroupKeys.map(month => (
              <div key={month}>
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 border-b-4 border-black pb-2 inline-block">
                  <Calendar className="w-6 h-6" />
                  {month}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupedEvents[month].map((event) => (
                    <div key={event.id} className={cn(
                      "brutal-card p-0 overflow-hidden cursor-pointer transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group",
                      event.status === "FAULTY" ? "bg-red-50" : "bg-white",
                      expandedEventId === event.id && "ring-4 ring-[#FF00D6] z-10 relative"
                    )}
                    onClick={() => setExpandedEventId(expandedEventId === event.id ? null : event.id)}
                    >
                      <div className="flex h-full relative">
                        {/* Expand Indicator */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
                           <ChevronDown className={cn(
                             "w-5 h-5 transition-transform bg-white border-2 border-black rounded-full p-0.5",
                             expandedEventId === event.id && "rotate-180 bg-yellow-300"
                           )} />
                        </div>

                        {/* Compact Date */}
                        <div className="bg-black text-white w-14 flex flex-col justify-center items-center border-r-2 border-black flex-shrink-0">
                          <span className="text-xl font-black leading-none">
                            {event.date.includes("Weekly") ? "W" : 
                             event.date.includes("Daily") ? "D" :
                             event.date.split('-')[2] || "?"}
                          </span>
                          <span className="text-[10px] font-bold uppercase mt-0.5">
                            {event.date.split('-')[1] ? new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase() : "REC"}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-2 flex-grow flex flex-col justify-center min-w-0 pr-8">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="text-sm font-black uppercase leading-tight w-full">
                              {event.title}
                            </h3>
                            {event.status === "FAULTY" && <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                          </div>
                          
                          <div className="flex flex-col gap-0.5 text-xs font-bold text-gray-700 mb-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              {event.time}
                            </span>
                            <span className="flex items-start gap-1">
                              <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{event.location}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-auto">
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.5 border border-black font-bold",
                              event.category === "NIGHTLIFE" ? "bg-purple-200" : "bg-blue-200"
                            )}>
                              {event.category}
                            </span>
                            {event.price && (
                              <span className="text-[10px] px-1.5 py-0.5 border border-black bg-green-200 font-bold">
                                {event.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedEventId === event.id && (
                        <div className="border-t-2 border-black p-3 bg-yellow-50 text-xs animate-in slide-in-from-top-2">
                           {event.status === "FAULTY" && (
                            <div className="bg-red-100 border border-red-500 p-2 mb-2">
                              <div className="font-black text-red-600 uppercase">Detection: {event.faultType}</div>
                              <p>{event.faultEvidence}</p>
                            </div>
                          )}
                          <p className="font-medium mb-2">{event.description || "No description available."}</p>
                          <div className="text-gray-500 font-mono text-[10px]">Source: {event.source}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {/* COMPACT FOOTER */}
      <footer className="bg-black text-white p-8 mt-12 border-t-4 border-[#FF00D6] text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter mb-1">The Consensus Engine</h2>
            <p className="text-xs text-gray-400 font-mono">Powered by Bespoke Ethos</p>
          </div>
          
          <p className="text-sm font-bold leading-tight">
            The only social calendar you need. <br/>
            <span className="text-[#FF00D6]">Bookmark us for the season.</span>
          </p>

          <div className="pt-4">
            <button className="inline-block border-2 border-white px-4 py-2 font-black uppercase text-xs hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_#FF00D6] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
              Start Your Own Gauntlet
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
