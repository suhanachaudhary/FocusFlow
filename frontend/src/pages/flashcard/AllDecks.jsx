import React, { useEffect, useState } from "react";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const AllDecks = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch("/api/flash/createdeck/all");
        if (!response.ok) throw new Error("Failed to fetch decks");
        const data = await response.json();
        console.log(data);
        setDecks(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading decks...</p>;

  return (
    <div className="mx-auto max-w-6xl p-4">
      {decks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 text-center mx-auto">
          <p className="text-black text-2xl">You don't have any decks</p>
          <NavLink
            role="link"
            to={"/flashcard/deck"}
            data-testid="navigation"
            className="px-6 py-2 bg-red-500 rounded-md text-xl font-semibold text-white hover:bg-red-700 transition-all"
          >
            Create Decks
          </NavLink>
        </div>
      ) : (
        <div
          className="grid gap-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          }}
        >
          {decks.map((deck) => (
            <MuiCard
              key={deck._id}
              sx={{
                width: "80%", // Full width within grid
                maxWidth: "800px", // Prevents it from getting too wide
                height: "80px", // Reduces height
                display: "flex",
                alignItems: "center",
                paddingX: 3, // Horizontal padding
                boxShadow: 3,
                margin: "auto",
                borderRadius: "40px",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div">
                  {deck.name}
                </Typography>
                <div>
                  <Tooltip title="Edit Deck">
                    <IconButton
                      onClick={() => {}}
                      color="primary"
                      sx={{ cursor: "pointer" }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Deck">
                    <IconButton
                      onClick={() => {}}
                      color="error"
                      sx={{ cursor: "pointer" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add to Deck">
                    <IconButton
                      onClick={() =>
                        navigate("/flashcard/card", {
                          state: { selectedDeckId: deck._id, deck },
                        })
                      }
                      color="primary"
                      sx={{ cursor: "pointer" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Deck">
                    <NavLink to={`/flashcard/dashboard/${deck._id}`}>
                      <IconButton sx={{ cursor: "pointer" }}>
                        <ArrowForwardIcon />
                      </IconButton>
                    </NavLink>
                  </Tooltip>
                </div>
              </CardContent>
            </MuiCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDecks;
