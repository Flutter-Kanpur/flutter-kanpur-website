"use client";

import { Box, Typography, TextField, InputAdornment, IconButton, Avatar, Badge, Paper, Divider, Chip, Stack, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function CommunityClient({ questions }) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [upvotes, setUpvotes] = useState({});
  const [answerText, setAnswerText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(questions && questions.length > 0 ? questions[0].id : null);

  useState(() =>{if (!questions || questions.length === 0) return;
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

  const handleAnswerSubmit =(questionId) => {
    if (answerText.trim()) {
      alert('Answer submitted: ' + answerText);
      setAnswerText('');
    }
  };

  const handleQuestionSelect=(questionId) =>setSelectedQuestion(questionId);

  const filteredQuestions = questions?.filter(question => {
    if (activeTab === 0) return true;
    const tabCategories = ["All", "Firebase", "State Management", "Flutter", "Animations", "Riverpod", "Dart"];
    return question.tags?.includes(tabCategories[activeTab]);
  });

  const currentQuestion = questions?.find(q => q.id === selectedQuestion) || (questions && questions.length > 0 ? questions[0] : null);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ width: "100%", padding: "25px 58px 15px 58px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        <Image src="/landingPageIcons/flutter_icon.svg" height={56} width={56} alt="Flutter Logo" />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search questions, tags..."
            variant="outlined"
            size="small"
            sx={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&.Mui-focused fieldset': { borderColor: '#64A9DD' }
              },
              '& .MuiInputBase-input': { color: 'white', padding: '10px 12px' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
            }}
          />
             <IconButton sx={{ color: 'white' }}>
            <Badge badgeContent={3} color="primary">
            <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton>
            <Avatar sx={{ width: 32, height: 32 }}>FK</Avatar>
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1.5, px: 8 }}>
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

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, pl: 3 }}>
        <Box sx={{ flex: '1 1 auto', minWidth: 0, pl: 3 }}>
          {currentQuestion ? (
            <>
              <Box sx={{ mb: 5 }}>
                <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
                  {currentQuestion.title || "How to use Provider in Flutter?"}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1.5 }} src={currentQuestion.author?.profilePicUrl}>
                    {currentQuestion.author?.name ? currentQuestion.author.name.charAt(0) : "P"}
                  </Avatar>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {currentQuestion.author?.name || "Pushti"} <Box component="span" sx={{ mx: 0.8 }}>•</Box>
                    {currentQuestion.createdAt instanceof Date ? 
                      `Posted ${currentQuestion.createdAt.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}` : 
                      'Posted recently'} <Box component="span" sx={{ mx: 0.8 }}>•</Box>
                    {currentQuestion.createdAt instanceof Date ? 
                      currentQuestion.createdAt.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}) : 
                      'Unknown time'}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  {currentQuestion.tags?.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: index % 3 === 0 ? 'rgba(100, 169, 221, 0.2)' :
                                index % 3 === 1 ? 'rgba(233, 30, 99, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                        color: index % 3 === 0 ? '#64A9DD' : index % 3 === 1 ? '#E91E63' : '#FF9800'
                      }}
                    />
                  ))}
                </Stack>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, pl: 0.5 }}>
                  {currentQuestion.body}
                </Typography>
                <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', mr: 3, cursor: 'pointer',
                        '&:hover': { color: '#64A9DD' }
                      }}
                      onClick={() => handleUpvote(`question-${currentQuestion.id}`)}
                    >
                      <ThumbUpIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.6)', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {upvotes[`question-${currentQuestion.id}`] || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                      <CommentIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.6)', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {currentQuestion.answers?.length || 0}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VisibilityIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.6)', mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {currentQuestion.views || 0} views
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, fontWeight: 600, ml: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 1 }}>
                {currentQuestion.answers?.length || 0} Answers
              </Typography>

              {currentQuestion.answers && currentQuestion.answers.length > 0 ? (
                currentQuestion.answers.map((answer, index) => (
                  <Paper key={index} sx={{ p: 3, backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 2, backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)", mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 2 }} src={answer.author?.profilePicUrl}>
                        {answer.author?.name ? answer.author.name.charAt(0) : "A"}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 500 }}>
                          {answer.author?.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Answered {answer.createdAt instanceof Date ? answer.createdAt.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : 'recently'}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                      {answer.answerText}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer',
                          '&:hover': { color: '#64A9DD' }
                        }}
                        onClick={() => handleUpvote(`answer-${currentQuestion.id}-${index}`)}
                      >
                        <ThumbUpIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.5)', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>
                          {upvotes[`answer-${currentQuestion.id}-${index}`] || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VisibilityIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.5)', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>
                          {answer.views || 12} views
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    No answers yet. Be the first to answer this question!
                  </Typography>
                </Box>
              )}

              <Paper sx={{ p: 3, backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 2, backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)", mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', fontWeight: 600 }}>
                  Your Answer
                </Typography>
                <TextField
                  placeholder="Share your solution or insights..."
                  multiline
                  rows={5}
                  fullWidth
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
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
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAnswerSubmit(currentQuestion.id)}
                    disabled={!answerText.trim()}
                    sx={{
                      backgroundColor: '#64A9DD',
                      '&:hover': { backgroundColor: '#4D96C9' },
                      '&.Mui-disabled': { backgroundColor: 'rgba(100, 169, 221, 0.3)', color: 'rgba(255, 255, 255, 0.5)' },
                      px: 3, borderRadius: 2
                    }}
                  >
                    Submit Answer
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
            <Paper sx={{ p: 3, backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 2, backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)", minHeight: "600px" }}>
              <Box sx={{ p: 1.5, mb: 3, borderRadius: 2, backgroundColor: "rgba(100, 169, 221, 0.1)", border: "1px solid rgba(100, 169, 221, 0.3)", textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  Frequently Asked Questions
                </Typography>
              </Box>
              {filteredQuestions?.slice(0, 5).map((question, index) => (
                <Box
                  key={index}
                  sx={{ mb: 3.5, display: 'flex', alignItems: 'center', cursor: 'pointer',
                    '&:hover': { '& .question-title': { color: '#64A9DD' } }
                  }}
                  onClick={() => handleQuestionSelect(question.id)}
                >
                  <Avatar sx={{ width: 32, height: 32, mr: 2 }} src={question.author?.profilePicUrl}>
                    {question.author?.name?.charAt(0)}
                  </Avatar>
                  <Typography
                    className="question-title"
                    variant="body1"
                    sx={{ color: selectedQuestion === question.id ? '#64A9DD' : 'rgba(255, 255, 255, 0.9)',
                      fontWeight: selectedQuestion === question.id ? 500 : 400,
                      transition: 'color 0.2s ease'
                    }}
                  >
                 {question.title}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Box
                  sx={{ py: 1.5, px: 4, backgroundColor: '#64A9DD', color: '#FFFFFF', borderRadius: 5, fontSize: '14px', fontWeight: 500, cursor: 'pointer',
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
