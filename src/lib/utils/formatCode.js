import { Box } from "@mui/material";

/**
 * Formats text with code blocks and inline code
 * Supports both ```code blocks``` and `inline code`
 */
export const formatTextWithCode = (text) => {
  if (!text) return '';
  
  // Split text by code blocks (anything between triple backticks or single backticks)
  const parts = text.split(/(```[\s\S]*?```|`[^`\n]*`)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      // Multi-line code block
      const codeContent = part.slice(3, -3).trim();
      // Extract language if specified (e.g., ```dart or ```javascript)
      const lines = codeContent.split('\n');
      const firstLine = lines[0];
      const language = /^[a-zA-Z]+$/.test(firstLine) ? firstLine : '';
      const actualCode = language ? lines.slice(1).join('\n') : codeContent;
      
      return (
        <Box
          key={index}
          component="pre"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(100, 169, 221, 0.3)',
            borderRadius: 2,
            p: 2.5,
            my: 2,
            overflow: 'auto',
            fontFamily: '"Fira Code", Consolas, Monaco, "Courier New", monospace',
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#e8e8e8',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            position: 'relative',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
            '&::before': language ? {
              content: `"${language}"`,
              position: 'absolute',
              top: '8px',
              right: '12px',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            } : {}
          }}
        >
          {actualCode}
        </Box>
      );
    } else if (part.startsWith('`') && part.endsWith('`') && !part.includes('\n')) {
      // Inline code
      const codeContent = part.slice(1, -1);
      return (
        <Box
          key={index}
          component="code"
          sx={{
            backgroundColor: 'rgba(100, 169, 221, 0.15)',
            border: '1px solid rgba(100, 169, 221, 0.3)',
            borderRadius: 1,
            px: 1.2,
            py: 0.4,
            mx: 0.2,
            fontFamily: '"Fira Code", Consolas, Monaco, "Courier New", monospace',
            fontSize: '13px',
            color: '#64A9DD',
            fontWeight: 500,
            display: 'inline-block'
          }}
        >
          {codeContent}
        </Box>
      );
    } else {
      // Regular text - handle line breaks
      return part.split('\n').map((line, lineIndex, array) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < array.length - 1 && <br />}
        </span>
      ));
    }
  });
};