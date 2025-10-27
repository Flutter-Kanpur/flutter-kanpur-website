"use client";

import { Box, Typography, TextField, InputAdornment, IconButton, Avatar, Badge, Paper, Divider, Chip, Stack, Button, Alert, Snackbar } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { auth } from "@/lib/firebase/server/setup";

export default function CommunityClient({ questions: initialQuestions }) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [upvotes, setUpvotes] = useState({});
  const [answerText, setAnswerText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(initialQuestions && initialQuestions.length > 0 ? initialQuestions[0].id : null);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ show: false, message: '', severity: 'success', showLoadMore: false });
  const [user, setUser] = useState(null);

  // State for new question form
  const [newQuestion, setNewQuestion] = useState({ title: '', body: '', tags: ['Flutter'] });
  const [isPostingQuestion, setIsPostingQuestion] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionFormStatus, setQuestionFormStatus] = useState({ show: false, message: '', severity: 'success' });

  // Track authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Function to format text with code blocks
  const formatTextWithCode = (text) => {
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

  useEffect(() => {
    if (!questions || questions.length === 0) return;
    const initialUpvotes = {};
    questions.forEach(question => {
      initialUpvotes[`question-${question.id}`] = question.views || 0;
      if (question.answers && question.answers.length > 0) {
        question.answers.forEach((answer, index) => {
          initialUpvotes[`answer-${question.id}-${index}`] = answer.views || 0;
        });
      }
    });
    setUpvotes(initialUpvotes);
  }, [questions]);

  const handleTabChange = (tabIndex) => setActiveTab(tabIndex);

  const handleUpvote = (key) => {
    setUpvotes(prev => ({
      ...prev,
      [key]: (prev[key]) + 1
    }));
  };

  const handleAnswerSubmit = async (questionId) => {
    // Check if user is authenticated
    if (!user) {
      alert("Please login first to submit an answer.");
      return;
    }

    if (!answerText.trim()) return;

    setIsSubmitting(true);
    setSubmissionStatus({ show: false });

    try {
      // Create answer data object
      const answerData = {
        answerText: answerText.trim(),
        author: {
          name: "You", 
          profilePicUrl: ""
        }
      };

      const response = await fetch('/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, answerData }),
      });

      const result = await response.json();

      if (result.success) {
        // Update the questions state with the new answer from the API
        setQuestions(prevQuestions => {
          return prevQuestions.map(question => {
            if (question.id === questionId) {
              // Clone the question object
              const updatedQuestion = { ...question };

              // Use the formatted answer from the API response
              const newAnswer = result.answer || {
                answerText: answerText.trim(),
                author: {
                  name: "You",
                  profilePicUrl: ""
                },
                createdAt: new Date(),
                views: 0
              };

              // Handle existing answers
              if (!updatedQuestion.answers) {
                updatedQuestion.answers = [newAnswer];
              } else if (Array.isArray(updatedQuestion.answers)) {
                updatedQuestion.answers = [...updatedQuestion.answers, newAnswer];
              } else {
                // Convert from old format to array
                updatedQuestion.answers = [updatedQuestion.answers, newAnswer];
              }

              return updatedQuestion;
            }
            return question;
          });
        });

        // Show success message
        setSubmissionStatus({
          show: true,
          message: 'Your answer has been submitted successfully!',
          severity: 'success'
        });

        // Clear the answer text field
        setAnswerText('');
      } else {
        // Show error message
        setSubmissionStatus({
          show: true,
          message: result.error || 'Failed to submit answer. Please try again.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setSubmissionStatus({
        show: true,
        message: 'An error occurred while submitting your answer.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionSelect = (questionId) => setSelectedQuestion(questionId);

  const handlePostQuestion = async () => {
    // Validate input
    if (!newQuestion.title.trim() || !newQuestion.body.trim()) {
      setQuestionFormStatus({
        show: true,
        message: 'Please provide both title and description for your question.',
        severity: 'error'
      });
      return;
    }

    setIsPostingQuestion(true);
    setQuestionFormStatus({ show: false });

    try {
      const questionData = {
        title: newQuestion.title.trim(),
        body: newQuestion.body.trim(),
        author: {
          name: "You",
          profilePicUrl: ""
        },
        tags: newQuestion.tags
      };

      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionData }),
      });

      const result = await response.json();

      if (result.success) {
        setQuestions(prevQuestions => [result.question, ...prevQuestions]);

        // Show success message
        setQuestionFormStatus({
          show: true,
          message: 'Your question has been posted successfully!',
          severity: 'success'
        });

        // Clear the form
        setNewQuestion({ title: '', body: '', tags: ['Flutter'] });

        // Close the form after a short delay
        setTimeout(() => {
          setShowQuestionForm(false);
        }, 1500);

      } else {
        setQuestionFormStatus({
          show: true,
          message: result.error || 'Failed to post question. Please try again.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error posting question:', error);
      setQuestionFormStatus({
        show: true,
        message: 'An error occurred while posting your question.',
        severity: 'error'
      });
    } finally {
      setIsPostingQuestion(false);
    }
  };

  const filteredQuestions = questions?.filter(question => {
    if (activeTab === 0) return true;
    const tabCategories = ["All", "Firebase", "State Management", "Flutter", "Animations", "Riverpod", "Dart"];
    return question.tags?.includes(tabCategories[activeTab]);
  });

  const currentQuestion = questions?.find(q => q.id === selectedQuestion) || (questions && questions.length > 0 ? questions[0] : null);

  return (
    <Box sx={{ minHeight: "100vh" }}>

      <Box sx={{ mb: 5, mt: 5, display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 1.5, px: 8 }}>
        {["All", "Firebase", "State Management", "Flutter", "Animations", "Riverpod", "Dart"].map((tab, index) => (
          <Box
            key={index}
            onClick={() => handleTabChange(index)}
            sx={{
              px: 2.5, py: 1, borderRadius: 4, cursor: 'pointer', fontSize: '14px', fontWeight: 500,
              backgroundColor: activeTab === index ? '#64A9DD' : 'rgba(255, 255, 255, 0.1)',
              color: activeTab === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
              '&:hover': { backgroundColor: activeTab === index ? '#64A9DD' : 'rgba(255, 255, 255, 0.15)' },
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 5, px: 6, mt: 4 }}>
        <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
          {currentQuestion ? (
            <>
              <Box sx={{ mb: 5, mt: 3, ml: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ mr: 3 }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        bgcolor: 'rgba(0, 0, 0, 0.3)'
                      }}
                      src={currentQuestion.author?.profilePicUrl}
                    >
                      {currentQuestion.author?.name ? currentQuestion.author.name.charAt(0) : "P"}
                    </Avatar>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 1.5, fontWeight: 600, lineHeight: 1.3 }}>
                      {currentQuestion.title || "How to use Provider in Flutter?"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1.5 }}>
                      {currentQuestion.author?.name || "Pushti"} <Box component="span" sx={{ mx: 0.8 }}>•</Box>
                      {currentQuestion.createdAt instanceof Date ?
                        `Posted ${currentQuestion.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` :
                        'Posted recently'} <Box component="span" sx={{ mx: 0.8 }}>•</Box>
                      {currentQuestion.createdAt instanceof Date ?
                        currentQuestion.createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) :
                        'Unknown time'}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                      {currentQuestion.tags?.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.7)'
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Box>
                <Box sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, pl: 0.5, ml: 3, lineHeight: 1.6 }}>
                  {currentQuestion.body ? formatTextWithCode(currentQuestion.body) : (
                    <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)' }}>
                      No description provided for this question.
                    </Typography>
                  )}
                </Box>
                <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              </Box>

              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 4, fontWeight: 600, ml: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 2 }}>
                {currentQuestion.answers?.length || 0} Answers
              </Typography>

              {currentQuestion.answers && currentQuestion.answers.length > 0 ? (
                currentQuestion.answers.map((answer, index) => (
                  <Paper key={index} sx={{
                    p: 3,
                    backgroundColor: "rgba(80, 80, 80, 0.3)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    mb: 4,
                    ml: 10
                  }}>
                    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                      <Box sx={{ mr: 2 }}>
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            bgcolor: 'rgba(0, 0, 0, 0.3)'
                          }}
                          src={answer.author?.profilePicUrl}
                        >
                          {answer.author?.name ? answer.author.name.charAt(0) : "A"}
                        </Avatar>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, lineHeight: 1.3 }}>
                          {answer.author?.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ pl: 2, borderLeft: '3px solid rgba(255, 255, 255, 0.15)' }}>
                      <Box sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2, fontWeight: 500, lineHeight: 1.6 }}>
                        {answer.answerText ? formatTextWithCode(answer.answerText) : (
                          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)' }}>
                            No answer content provided.
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>
                        {answer.createdAt instanceof Date ?
                          (() => {
                            const diffMs = new Date() - answer.createdAt;
                            // Ensure we're working with a positive time difference
                            const absDiffMs = Math.abs(diffMs);
                            const diffMins = Math.floor(absDiffMs / (1000 * 60));
                            const diffHours = Math.floor(diffMins / 60);
                            const diffDays = Math.floor(diffHours / 24);
                            const diffMonths = Math.floor(diffDays / 30);

                            if (diffMonths > 0) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
                            if (diffDays > 0) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
                            if (diffHours > 0) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
                            if (diffMins > 0) return `${diffMins} ${diffMins === 1 ? 'min' : 'mins'} ago`;
                            return `just now`;
                          })() :
                          '3 mins ago'}
                      </Typography>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Box sx={{
                  py: 4,
                  ml: 10,
                  backgroundColor: "rgba(80, 80, 80, 0.3)",
                  borderRadius: 2,
                  p: 3,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>
                    No answers yet. Be the first to answer this question!
                  </Typography>
                </Box>
              )}

              <Paper sx={{ p: 4, backgroundColor: "rgba(80, 80, 80, 0.3)", borderRadius: 2, backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)", mb: 5, ml: 10, mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, color: '#FFFFFF', fontWeight: 600 }}>
                  Your Answer
                </Typography>
                {submissionStatus.show && (
                  <Alert
                    severity={submissionStatus.severity}
                    sx={{
                      mb: 2,
                      backgroundColor: submissionStatus.severity === 'success'
                        ? 'rgba(76, 175, 80, 0.1)'
                        : 'rgba(244, 67, 54, 0.1)',
                      color: submissionStatus.severity === 'success'
                        ? '#81c784'
                        : '#e57373',
                      '& .MuiAlert-icon': {
                        color: submissionStatus.severity === 'success' ? '#81c784' : '#e57373'
                      }
                    }}
                    onClose={() => setSubmissionStatus(prev => ({ ...prev, show: false }))}
                  >
                    {submissionStatus.message}
                  </Alert>
                )}
                <TextField
                  placeholder="Share your solution or insights...

Use backticks for code:
- Inline: `yourCode()` 
- Block: ```dart
Widget build(context) {
  return Container();
}
```"
                  multiline
                  rows={6}
                  fullWidth
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  error={answerText.trim() === '' && answerText !== ''}
                  helperText={answerText.trim() === '' && answerText !== '' ? 'Answer cannot be empty' : 'You can format code using backticks: `code` or ```dart for code blocks'}
                  InputProps={{
                    sx: {
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(100, 169, 221, 0.6)' },
                      '& textarea::placeholder': {
                        fontSize: '14px',
                        lineHeight: 1.4
                      }
                    }
                  }}
                  FormHelperTextProps={{
                    sx: { 
                      color: answerText.trim() === '' && answerText !== '' ? '#ff6b6b' : 'rgba(255, 255, 255, 0.5)',
                      fontSize: '12px'
                    }
                  }}
                  sx={{ mb: 2 }}
                  disabled={isSubmitting}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAnswerSubmit(currentQuestion.id)}
                    disabled={!answerText.trim() || isSubmitting}
                    sx={{
                      backgroundColor: '#64A9DD',
                      '&:hover': { backgroundColor: '#4D96C9' },
                      '&.Mui-disabled': { backgroundColor: 'rgba(100, 169, 221, 0.3)', color: 'rgba(255, 255, 255, 0.5)' },
                      px: 3, borderRadius: 2
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Answer"}
                  </Button>
                </Box>
              </Paper>
            </>
          ) : (
            <Typography variant="h5" sx={{ color: '#FFFFFF', textAlign: 'center', py: 5 }}>
              No questions found
            </Typography>
          )}
        </Box>

        <Box sx={{ flex: '0 0 30%', width: '30%', minWidth: '300px', alignSelf: 'flex-start' }}>
          <Box sx={{ position: 'sticky', top: '20px' }}>
            <Paper sx={{
              p: 3,
              backgroundColor: "rgba(100, 169, 221, 0.1)",
              borderRadius: 2,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(100, 169, 221, 0.3)",
              mb: 3
            }}>
              {!showQuestionForm ? (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShowQuestionForm(true)}
                  sx={{
                    backgroundColor: '#64A9DD',
                    '&:hover': { backgroundColor: '#4D96C9' },
                    borderRadius: 2,
                    py: 1.2
                  }}
                >
                  Post a New Question
                </Button>
              ) : (
                <>
                  <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 2 }}>
                    Ask a Question
                  </Typography>

                  {questionFormStatus.show && (
                    <Alert
                      severity={questionFormStatus.severity}
                      sx={{
                        mb: 2,
                        backgroundColor: questionFormStatus.severity === 'success'
                          ? 'rgba(76, 175, 80, 0.1)'
                          : 'rgba(244, 67, 54, 0.1)',
                        color: questionFormStatus.severity === 'success'
                          ? '#81c784'
                          : '#e57373',
                        '& .MuiAlert-icon': {
                          color: questionFormStatus.severity === 'success' ? '#81c784' : '#e57373'
                        }
                      }}
                      onClose={() => setQuestionFormStatus(prev => ({ ...prev, show: false }))}
                    >
                      {questionFormStatus.message}
                    </Alert>
                  )}

                  <TextField
                    placeholder="Question Title"
                    fullWidth
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                    InputProps={{
                      sx: {
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(100, 169, 221, 0.6)' }
                      }
                    }}
                    sx={{ mb: 2 }}
                    disabled={isPostingQuestion}
                  />

                  <TextField
                    placeholder="Describe your question in detail... 

You can include code using:
- Inline code: `your code here`
- Code blocks: ```dart
your code here
```"
                    multiline
                    rows={6}
                    fullWidth
                    value={newQuestion.body}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, body: e.target.value }))}
                    InputProps={{
                      sx: {
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(100, 169, 221, 0.6)' },
                        '& textarea::placeholder': {
                          fontSize: '14px',
                          lineHeight: 1.4
                        }
                      }
                    }}
                    sx={{ mb: 2 }}
                    disabled={isPostingQuestion}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowQuestionForm(false)}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { borderColor: 'rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.05)' },
                        flex: 1
                      }}
                      disabled={isPostingQuestion}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePostQuestion}
                      disabled={!newQuestion.title.trim() || !newQuestion.body.trim() || isPostingQuestion}
                      sx={{
                        backgroundColor: '#64A9DD',
                        '&:hover': { backgroundColor: '#4D96C9' },
                        '&.Mui-disabled': { backgroundColor: 'rgba(100, 169, 221, 0.3)', color: 'rgba(255, 255, 255, 0.5)' },
                        flex: 1
                      }}
                    >
                      {isPostingQuestion ? "Posting..." : "Post Question"}
                    </Button>
                  </Box>
                </>
              )}
            </Paper>

            <Paper sx={{ p: 4, backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 2, backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)", minHeight: "600px" }}>
              <Box sx={{ p: 2, mb: 4, borderRadius: 2, backgroundColor: "rgba(100, 169, 221, 0.1)", border: "1px solid rgba(100, 169, 221, 0.3)", textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  Frequently Asked Questions
                </Typography>
              </Box>
              {filteredQuestions?.slice(0, 5).map((question, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 4.5, display: 'flex', alignItems: 'center', cursor: 'pointer',
                    '&:hover': { '& .question-title': { color: '#64A9DD' } }
                  }}
                  onClick={() => handleQuestionSelect(question.id)}
                >
                  <Avatar
                    sx={{
                      width: 45,
                      height: 45,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      mr: 2,
                      flexShrink: 0
                    }}
                    src={question.author?.profilePicUrl}
                  >
                    {question.author?.name?.charAt(0)}
                  </Avatar>
                  <Typography
                    className="question-title"
                    variant="body1"
                    sx={{
                      color: selectedQuestion === question.id ? '#64A9DD' : 'rgba(255, 255, 255, 0.9)',
                      fontWeight: selectedQuestion === question.id ? 500 : 400,
                      transition: 'color 0.2s ease',
                      lineHeight: 1.4,
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 45
                    }}
                  >
                    {question.title}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, gap: 2 }}>
                {submissionStatus.showLoadMore && (
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', textAlign: 'center' }}>
                    More questions will be added soon. Stay tuned!
                  </Typography>
                )}
                <Box
                  onClick={() => setSubmissionStatus(prev => ({ ...prev, showLoadMore: true }))}
                  sx={{
                    py: 1.5, px: 4, backgroundColor: '#64A9DD', color: '#FFFFFF', borderRadius: 5, fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                    '&:hover': { backgroundColor: '#4D96C9' }
                  }}
                >Load more questions...
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
