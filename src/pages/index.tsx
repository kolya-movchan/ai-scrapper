import React from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ScrapingForm = () => {
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [showCustomRole, setShowCustomRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [customRoles, setCustomRoles] = useState([]);
  const [error, setError] = useState("");

  const predefinedRoles = [
    "Account Manager",
    "Agile Coach",
    "Android Developer",
    "Art Director",
    "Artificial Intelligence Engineer",
    "Backend Developer",
    "Brand Manager",
    "Business Analyst",
    "Business Intelligence Analyst",
    "Chief Marketing Officer",
    "Cloud Architect",
    "Cloud Engineer",
    "Content Manager",
    "Content Marketing Manager",
    "Content Strategist",
    "Copywriter",
    "CRM Manager",
    "Data Analyst",
    "Data Engineer",
    "Data Scientist",
    "Database Administrator",
    "DevOps Engineer",
    "Digital Marketing Manager",
    "Digital Marketing Specialist",
    "Email Marketing Specialist",
    "Frontend Developer",
    "Full Stack Developer",
    "Game Developer",
    "Growth Marketing Manager",
    "iOS Developer",
    "IT Project Manager",
    "Java Developer",
    "JavaScript Developer",
    "Machine Learning Engineer",
    "Market Research Analyst",
    "Marketing Analytics Manager",
    "Marketing Automation Specialist",
    "Marketing Coordinator",
    "Marketing Director",
    "Mobile Developer",
    "Network Administrator",
    "Network Engineer",
    "Performance Marketing Manager",
    "PHP Developer",
    "Product Designer",
    "Product Manager",
    "Product Marketing Manager",
    "Project Manager",
    "Python Developer",
    "QA Engineer",
    "React Developer",
    "Ruby Developer",
    "Scrum Master",
    "SEO Manager",
    "SEO Specialist",
    "Site Reliability Engineer",
    "Social Media Manager",
    "Software Architect",
    "Software Engineer",
    "Solutions Architect",
    "System Administrator",
    "Systems Analyst",
    "Technical Lead",
    "Technical Writer",
    "UI Designer",
    "UX Designer",
    "UX Researcher",
    "Web Analytics Specialist",
    "WordPress Developer",
  ].sort();

  // Combine predefined and custom roles, and sort them
  const allRoles = [...predefinedRoles, ...customRoles].sort();

  const experienceLevels = [
    "No experience",
    "Less than 1 year",
    "1 year",
    "1-2 years",
    "2-3 years",
    "3-5 years",
    "5+ years",
    "7+ years",
    "10+ years",
  ];

  const profileCounts = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleKeywordAdd = (e) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const handleRoleSelect = (value) => {
    if (value === "custom") {
      setShowCustomRole(true);
      setSelectedRole("");
    } else {
      setSelectedRole(value);
      setShowCustomRole(false);
    }
  };

  const handleCustomRoleSubmit = () => {
    const trimmedRole = customRole.trim();
    if (trimmedRole) {
      if (allRoles.includes(trimmedRole)) {
        setError("This role already exists!");
        return;
      }
      setCustomRoles([...customRoles, trimmedRole]);
      setSelectedRole(trimmedRole);
      setShowCustomRole(false);
      setCustomRole("");
      setError("");
    }
  };

  const handleCustomRoleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCustomRoleSubmit();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          Profile Scraping Configuration
        </CardTitle>
        <CardDescription>
          Set up your profile scraping parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            {!showCustomRole ? (
              <Select value={selectedRole} onValueChange={handleRoleSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">
                    <span className="flex items-center gap-2 text-blue-600">
                      <PlusCircle className="w-4 h-4" />
                      Add Custom Role
                    </span>
                  </SelectItem>
                  {allRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                      {customRoles.includes(role) && (
                        <span className="ml-2 text-xs text-blue-600">
                          (Custom)
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    onKeyDown={handleCustomRoleKeyDown}
                    placeholder="Enter custom role"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleCustomRoleSubmit}>
                    Add
                  </Button>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetCompany">Target Company (Optional)</Label>
            <Input
              id="targetCompany"
              placeholder="Enter target company name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="Type keyword and press Enter"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordAdd}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileCount">Profile Count</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select number of profiles" />
              </SelectTrigger>
              <SelectContent>
                {profileCounts.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} profiles
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vacancyLink">Vacancy Link</Label>
            <Input
              id="vacancyLink"
              placeholder="Enter vacancy URL"
              type="url"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt message"
              className="min-h-[100px]"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Start Scraping
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScrapingForm;
