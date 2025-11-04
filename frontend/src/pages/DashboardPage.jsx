import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

// Import shadcn components and our loader icon
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Loader2, Save, Trash2, PlusSquare, Menu, X, BrainCircuit } from 'lucide-react';


import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from 'reactflow';

// Import the CSS for React Flow
import 'reactflow/dist/style.css';


const MindMap = ({ initialNodes, initialEdges }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView 
      className="bg-muted"
    >
      <Controls />
      <MiniMap />
      <Background gap={12} size={1} />
    </ReactFlow>
  );
};



const DashboardPage = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- State Management ---
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [savedMaps, setSavedMaps] = useState([]);
  const [currentMapId, setCurrentMapId] = useState(null);
  const [explanation, setExplanation] = useState("");

  // New state to manage the mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- API Functions ---
  const getAuthHeader = useCallback(() => {
    const token = userInfo?.token;
    // If no token, return empty headers
    return token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : { headers: {} };
  }, [userInfo]);

  const fetchMyMaps = useCallback(async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5001/api/maps/my-maps',
        getAuthHeader()
      );
      setSavedMaps(data);
    } catch (err) {
      console.error('Failed to fetch maps list', err);
    }
  }, [getAuthHeader]);

  // --- Effects ---
  useEffect(() => {
    if (userInfo) {
      fetchMyMaps();
    }
  }, [userInfo, fetchMyMaps]);

  // --- Event Handlers ---
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewMap = () => {
    setTopic('');
    setNodes([]);
    setEdges([]);
    setCurrentMapId(null);
    setExplanation('');
    setError(null);
    setIsSidebarOpen(false); // Close sidebar on navigation
  };

  const handleGenerateMap = async (e) => {
    e.preventDefault();
    if (!topic) return;
    setIsLoading(true);
    setError(null);
    setNodes([]);
    setEdges([]);
    setCurrentMapId(null);
    setExplanation('');
    try {
      const { data } = await axios.post(
        'http://localhost:5001/api/ai/generate-map',
        { topic },
        getAuthHeader()
      );
      setNodes(data.mapData.nodes || []);
      setEdges(data.mapData.edges || []);
      setExplanation(data.explanation || 'No explanation provided.');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to generate map.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMap = async () => {
    if (nodes.length === 0 || !topic) {
      setError('Cannot save an empty map.');
      return;
    }
    setIsLoading(true);
    try {
      const mapData = { nodes, edges };
      const { data: savedMap } = await axios.post(
        'http://localhost:5001/api/maps',
        { topic, mapData, explanation },
        getAuthHeader()
      );
      setCurrentMapId(savedMap._id);
      await fetchMyMaps();
    } catch (err) {
      console.error(err);
      setError('Failed to save map.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMap = async (mapId) => {
    setIsLoading(true);
    setError(null);
    setIsSidebarOpen(false); //  Close sidebar on navigation
    try {
      const { data } = await axios.get(
        `http://localhost:5001/api/maps/${mapId}`,
        getAuthHeader()
      );
      setTopic(data.topic);
      setNodes(data.mapData.nodes);
      setEdges(data.mapData.edges);
      setExplanation(data.explanation || '');
      setCurrentMapId(data._id);
    } catch (err) {
      console.error(err);
      setError('Failed to load map.');
      handleNewMap();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMap = async (mapId) => {
    if (!window.confirm('Are you sure you want to delete this map?')) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5001/api/maps/${mapId}`,
        getAuthHeader()
      );
      if (currentMapId === mapId) {
        handleNewMap();
      }
      await fetchMyMaps();
    } catch (err) {
      console.error(err);
      setError('Failed to delete map.');
    }
  };

  const handleUpgrade = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      // 1. Call backend to get payment URL
      const { data } = await axios.post(
        'http://localhost:5001/api/payments/initialize',
        {}, // Empty body, email is from token
        getAuthHeader()
      );

      // 2. Redirect user to Paystack's page
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError('Could not initiate payment.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    // --- RESPONSIVE --- Added 'relative' and 'overflow-hidden' to main container
    <div className="flex h-screen bg-muted/40 relative overflow-hidden">
      
      {/* --- RESPONSIVE --- Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-10 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`absolute md:static z-20 h-full flex flex-col w-64 border-r bg-background p-4 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* --- RESPONSIVE --- Mobile close button (hidden on desktop) */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden absolute top-2 right-2"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="flex items-center space-x-2 mb-6">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">PathFinder AI</span>
        </div>

        <Button variant="default" size="md" onClick={handleNewMap} className="mb-4 w-full h-9">
          <PlusSquare className="mr-2 h-4 w-4" /> New Map
        </Button>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">My Maps</h3>
          {savedMaps.length === 0 && (
            <p className="px-2 text-sm text-muted-foreground">No saved maps yet.</p>
          )}
          {savedMaps.map((map) => (
            <div
              key={map._id}
              className={`group flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${currentMapId === map._id ? 'bg-muted font-semibold' : ''}`}
            >
              <span onClick={() => handleLoadMap(map._id)} className="truncate flex-1">
                {map.topic}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100"
                onClick={() => handleDeleteMap(map._id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </nav>

        <div className="border-t pt-4 mt-4">
          <p className="text-sm font-medium truncate">{userInfo?.username}</p>
          <p className="text-xs text-muted-foreground truncate">{userInfo?.email}</p>
          {userInfo?.plan === 'free' && (
            <Button variant="outline" size="sm"
              onClick={handleUpgrade} 
              disabled={isLoading}
              className="w-full mt-4"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade to Premium
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout} className="w-full mt-4">
            Logout
          </Button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-screen">
        <header className="flex items-center justify-between p-4 border-b bg-background">
          {/* Wrapped form/title in a flex-1 div to make space for save button */}
          <div className="flex-1 flex items-center min-w-0">
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Show save button or topic based on state */}
            {currentMapId ? (
              <h2 className="text-xl font-semibold truncate">{topic}</h2>
            ) : (
              <form onSubmit={handleGenerateMap} className="flex gap-2 w-full max-w-lg">
                <Input
                  type="text"
                  className="flex-1" // Kept your class
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a new topic..."
                  disabled={isLoading}
                />
                <Button variant="default" size="md" type="submit" disabled={isLoading} className="w-32">
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Generate'}
                </Button>
              </form>
            )}
          </div>

          {/* Show Save button only for new, unsaved maps */}
          {!currentMapId && nodes.length > 0 && (
            <Button variant="default" size="md" onClick={handleSaveMap} disabled={isLoading} className="ml-4 h-9 w-40">
              <Save className="mr-2 h-4 w-4" /> Save Map
            </Button>
          )}
        </header>

        {/* --- Map/Loading Area --- */}
        <div className="flex-1 flex flex-col md:flex-row w-full overflow-hidden">

          {/* --- Map Area (Left Side) --- */}
          <div className="flex-1 h-1/2 md:h-full w-full md:w-1/2 overflow-hidden relative border-b md:border-b-0">
            {/* All your error, loading, and placeholder divs go here */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center z-10 text-destructive bg-destructive/10">
                <p>Error: {error}</p>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-background/50 backdrop-blur-sm">
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
                <p>Loading...</p>
              </div>
            )}
            {!isLoading && nodes.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Generate a new map or select a saved map to begin.</p>
              </div>
            )}
            {nodes.length > 0 && (
              <MindMap initialNodes={nodes} initialEdges={edges} />
            )}
          </div>

          {/* --- Explanation Area (Right Side) --- */}
          <div className="flex-1 h-1/2 md:h-full w-full md:w-1/2 border-l overflow-y-auto p-6 bg-background">
            <h2 className="text-2xl font-semibold mb-4">Topic Explanation</h2>
            {isLoading && !explanation ? ( // --- RESPONSIVE --- Tweaked loading logic
              <p className="text-muted-foreground">Generating explanation...</p>
            ) : explanation ? (
              <p className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                {explanation}
              </p>
            ) : (
              !isLoading && (
                <p className="text-muted-foreground">
                  {nodes.length > 0 ? 'No explanation available for this map.' : 'Your explanation will appear here.'}
                </p>
              )
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardPage;