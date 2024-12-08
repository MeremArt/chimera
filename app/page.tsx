"use client";
import React, { useState } from "react";
import { X, Calendar, Upload } from "lucide-react";
import axios from "axios";

interface FormData {
  twitterHandle: string;
  litepaper: File | null;
  personality: string;
}

interface ValidationErrors {
  twitterHandle?: string;
  litepaper?: string;
  personality?: string;
}

const LandingPage = () => {
  const [formData, setFormData] = useState<FormData>({
    twitterHandle: "",
    litepaper: null,
    personality: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.twitterHandle) {
      newErrors.twitterHandle = "Twitter handle is required";
    } else if (!formData.twitterHandle.startsWith("@")) {
      newErrors.twitterHandle = "Twitter handle must start with @";
    }

    if (!formData.litepaper) {
      newErrors.litepaper = "Litepaper is required";
    } else {
      const fileSize = formData.litepaper.size / 1024 / 1024; // Convert to MB
      const fileType = formData.litepaper.type;

      if (fileSize > 10) {
        newErrors.litepaper = "File size must be less than 10MB";
      }

      if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(fileType)
      ) {
        newErrors.litepaper = "Only PDF and DOC files are allowed";
      }
    }

    if (!formData.personality) {
      newErrors.personality = "Please select a personality type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        litepaper: file,
      });
      // Clear any previous file errors
      setErrors((prev) => ({ ...prev, litepaper: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors before submitting",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Create form data for multipart/form-data submission
      const submitData = new FormData();
      submitData.append("twitterHandle", formData.twitterHandle);
      submitData.append("personalityType", formData.personality);
      if (formData.litepaper) {
        submitData.append("litepaper", formData.litepaper);
      }

      // Submit to your API endpoint
      const response = await axios.post(
        "http://localhost:3000/api/submit",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If successful, proceed to book meeting
      if (response.data.companyId) {
        const meetingResponse = await axios.post(
          "http://localhost:3000/api/book-meeting",
          {
            companyId: response.data.companyId,
            // You can add preferred date/time here if implementing a calendar picker
          }
        );

        setSubmitStatus({
          type: "success",
          message:
            "Information submitted successfully! We'll contact you shortly to confirm the meeting.",
        });

        // Reset form
        setFormData({
          twitterHandle: "",
          litepaper: null,
          personality: "",
        });
      }
    } catch (error) {
      let errorMessage = "An error occurred while submitting your information.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const personalities = [
    {
      id: "professional",
      name: "Professional & Corporate",
      description: "Formal, authoritative voice with industry expertise",
    },
    {
      id: "casual",
      name: "Casual & Friendly",
      description: "Approachable, conversational tone with a personal touch",
    },
    {
      id: "innovative",
      name: "Innovative & Bold",
      description: "Forward-thinking, disruptive voice that challenges norms",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Personalize Your Company&apos;s Twitter Presence with AI
          </h1>
          <p className="text-xl text-gray-600">
            Create a unique AI agent that tweets in your company&apos;s voice
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Create Your AI Twitter Agent
            </h2>
            <p className="text-gray-600">
              Fill in the details below to get started with your personalized AI
              agent
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Twitter Handle */}
            <div className="space-y-2">
              <label
                htmlFor="twitter-handle"
                className="block font-medium text-gray-700"
              >
                Twitter Handle
              </label>
              <div className="relative">
                <X className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="twitter-handle"
                  placeholder="@yourcompany"
                  className={`w-full border rounded-lg px-10 py-2 focus:ring-2 focus:outline-none ${
                    errors.twitterHandle
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={formData.twitterHandle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      twitterHandle: e.target.value,
                    })
                  }
                />
                {errors.twitterHandle && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.twitterHandle}
                  </p>
                )}
              </div>
            </div>

            {/* Litepaper Upload */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Company Litepaper
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  errors.litepaper ? "border-red-500" : "border-gray-300"
                }`}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <input
                    type="file"
                    id="litepaper"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="litepaper"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer inline-block"
                  >
                    {formData.litepaper ? "Change File" : "Upload Litepaper"}
                  </label>
                  {formData.litepaper && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {formData.litepaper.name}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    PDF or DOC up to 10MB
                  </p>
                  {errors.litepaper && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.litepaper}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Personality Selection */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Select Agent Personality
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personalities.map((personality) => (
                  <div
                    key={personality.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.personality === personality.id
                        ? "border-blue-500 ring-2 ring-blue-500"
                        : errors.personality
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        personality: personality.id,
                      })
                    }
                  >
                    <h3 className="font-semibold">{personality.name}</h3>
                    <p className="text-sm text-gray-600">
                      {personality.description}
                    </p>
                  </div>
                ))}
              </div>
              {errors.personality && (
                <p className="text-sm text-red-500">{errors.personality}</p>
              )}
            </div>

            {/* Book Meeting Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center px-4 py-3 rounded-lg text-white
                ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {isSubmitting ? "Submitting..." : "Book a Meeting with Our Team"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
