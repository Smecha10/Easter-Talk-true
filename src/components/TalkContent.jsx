import { talkData } from '../TalkData';

export default function TalkContent() {
  return (
    <div className="talk-content">
      {talkData.map((section, index) => {
        if (section.type === 'transition') {
          return (
            <div key={section.id} className="transition-box fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="transition-label">Transition Note:</span> {section.content}
            </div>
          );
        }

        return (
          <section key={section.id} className="talk-section fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
            <h2 className="section-title">{section.title}</h2>
            <div className="section-body">
              {section.content.map((paragraph, i) => (
                <p 
                  key={i} 
                  className={paragraph.startsWith('(') && paragraph.endsWith(')') ? 'reference-note' : 'talk-text'}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
