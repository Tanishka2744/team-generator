import { useState } from "react";
import "./App.css";

const members = [
  {
    id: 1,
    name: "Aarav",
    role: "Frontend Developer",
    avatar: "👨‍💻",
    color: "purple",
    bio: "Builds beautiful and interactive user interfaces.",
    skills: ["HTML", "CSS", "React"],
  },
  {
    id: 2,
    name: "Riya",
    role: "UI/UX Designer",
    avatar: "👩‍🎨",
    color: "pink",
    bio: "Designs intuitive and user-friendly digital experiences.",
    skills: ["Figma", "UI Design", "Prototyping"],
  },
  {
    id: 3,
    name: "Kabir",
    role: "Backend Developer",
    avatar: "👨‍💻",
    color: "blue",
    bio: "Creates reliable systems and efficient application logic.",
    skills: ["Node.js", "APIs", "Databases"],
  },
  {
    id: 4,
    name: "Ananya",
    role: "Product Manager",
    avatar: "👩‍💼",
    color: "orange",
    bio: "Turns ideas into products through planning and teamwork.",
    skills: ["Planning", "Strategy", "Agile"],
  },
  {
    id: 5,
    name: "Vihaan",
    role: "React Developer",
    avatar: "👨‍🚀",
    color: "cyan",
    bio: "Creates reusable components and dynamic web applications.",
    skills: ["React", "JavaScript", "Vite"],
  },
  {
    id: 6,
    name: "Meera",
    role: "Graphic Designer",
    avatar: "👩‍🎨",
    color: "rose",
    bio: "Brings ideas to life through creative visual storytelling.",
    skills: ["Branding", "Typography", "Illustration"],
  },
  {
    id: 7,
    name: "Aditya",
    role: "Data Analyst",
    avatar: "👨‍💼",
    color: "green",
    bio: "Transforms data into useful insights and clear reports.",
    skills: ["Excel", "Analytics", "Visualization"],
  },
  {
    id: 8,
    name: "Ishita",
    role: "QA Engineer",
    avatar: "👩‍💻",
    color: "yellow",
    bio: "Tests applications to ensure quality and reliability.",
    skills: ["Testing", "Debugging", "Quality"],
  },
];

function MemberCard({ member, isSelected, onAdd }) {
  return (
    <article className={`member-card ${member.color} ${isSelected ? "selected" : ""}`}>
      <div className="card-top">
        <span className="member-number">
          MEMBER {String(member.id).padStart(2, "0")}
        </span>
        <span className="status-dot" />
      </div>

      <div className="avatar">{member.avatar}</div>

      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      <p className="member-bio">{member.bio}</p>

      <div className="skill-list">
        {member.skills.map((skill) => (
          <span className="skill-tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <button
        className={`add-button ${isSelected ? "added" : ""}`}
        onClick={onAdd}
        disabled={isSelected}
      >
        {isSelected ? (
          <>✓ Added to Team</>
        ) : (
          <>＋ Add to Team</>
        )}
      </button>
    </article>
  );
}

function TeamMember({ member, onRemove }) {
  return (
    <div className="team-member">
      <div className={`team-avatar ${member.color}`}>
        {member.avatar}
      </div>

      <div className="team-member-info">
        <h4>{member.name}</h4>
        <p>{member.role}</p>
      </div>

      <button
        className="remove-button"
        onClick={() => onRemove(member.id)}
        aria-label={`Remove ${member.name} from team`}
        title={`Remove ${member.name}`}
      >
        ✕
      </button>
    </div>
  );
}

function App() {
  const [team, setTeam] = useState([]);

  const addToTeam = (member) => {
    setTeam((currentTeam) => {
      if (currentTeam.some((item) => item.id === member.id)) {
        return currentTeam;
      }

      return [...currentTeam, member];
    });
  };

  const removeFromTeam = (memberId) => {
    setTeam((currentTeam) =>
      currentTeam.filter((member) => member.id !== memberId)
    );
  };

  return (
    <main className="app">
      <div className="page-container">
        <header className="header">
          <div className="brand">
            <span className="brand-icon">✦</span>
            <span>TEAMSPACE</span>
          </div>

          <span className="header-pill">
            <span className="live-dot" />
            INTERACTIVE TEAM BUILDER
          </span>

          <h1>
            Build your <span>dream team.</span>
          </h1>

          <p className="header-description">
            Great things happen when the right people come together.
            Pick your people and create your perfect team.
          </p>

          <div className="header-stats">
            <div className="stat">
              <strong>08</strong>
              <span>TEAM MEMBERS</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>01</strong>
              <span>GREAT TEAM</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>{String(team.length).padStart(2, "0")}</strong>
              <span>SELECTED</span>
            </div>
          </div>
        </header>

        <section className="members-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MEET THE CREW</span>
              <h2>Choose your members</h2>
              <p>Find the right people for your next big idea.</p>
            </div>

            <span className="count-badge">{members.length} MEMBERS</span>
          </div>

          <div className="members-grid">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isSelected={team.some((item) => item.id === member.id)}
                onAdd={() => addToTeam(member)}
              />
            ))}
          </div>
        </section>

        <section className="team-section">
          <div className="team-heading">
            <div>
              <span className="eyebrow">YOUR SELECTION</span>
              <h2>Your team <span>({team.length})</span></h2>
              <p>Your chosen members will appear here.</p>
            </div>

            {team.length > 0 && (
              <button
                className="clear-button"
                onClick={() => setTeam([])}
              >
                Clear team ↺
              </button>
            )}
          </div>

          {team.length === 0 ? (
            <div className="empty-team">
              <div className="empty-icon">👥</div>
              <h3>Your team starts here</h3>
              <p>
                Your favorite people, one click away.
                Add a member above to get started!
              </p>
              <span className="empty-hint">＋ SELECT YOUR FIRST MEMBER</span>
            </div>
          ) : (
            <>
              <div className="team-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${(team.length / members.length) * 100}%` }}
                  />
                </div>
                <span>{team.length} of {members.length} members selected</span>
              </div>

              <div className="team-grid">
                {team.map((member) => (
                  <TeamMember
                    key={member.id}
                    member={member}
                    onRemove={removeFromTeam}
                  />
                ))}
              </div>

              {team.length === members.length && (
                <div className="team-complete">
                  🎉 Amazing! Your team is complete.
                </div>
              )}
            </>
          )}
        </section>

        <footer className="footer">
          <span>✦ TEAMSPACE</span>
          <p>Built with React & creativity 💜</p>
          <span>CODE WITH TANISHKA</span>
        </footer>
      </div>
    </main>
  );
}

export default App;