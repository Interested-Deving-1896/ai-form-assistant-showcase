(() => {
  // src/shared/guided-questions/services/guidedQuestionsService.js
  var MOCK_GUIDED_QUESTIONS = [
    {
      id: "1",
      question: "What is the purpose of this form?",
      stepId: "step1-Introduction"
    },
    {
      id: "2",
      question: "What is a water licence?",
      stepId: "step1-Introduction"
    },
    {
      id: "3",
      question: "Who needs a water licence?",
      stepId: "step1-Introduction"
    },
    {
      id: "4",
      question: "what is this screen about?",
      stepId: "step2-Eligibility"
    },
    {
      id: "5",
      question: "As a first nation, am I eligible?",
      stepId: "step2-Eligibility"
    },
    {
      id: "6",
      question: "As a farm owner, am I eligible?",
      stepId: "step2-Eligibility"
    }
  ];

  async function normalizeComparableValue(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
  }


  async function fetchGuidedQuestions(stepId, guidedQuestionsApiUrl) {
    if (!stepId) return [];
    const url = new URL(guidedQuestionsApiUrl);
    url.searchParams.set("stepId", stepId);
    const questions = MOCK_GUIDED_QUESTIONS;
    return Array.isArray(questions) ? questions.filter((question) => question && String(question.stepId || "") === String(stepId)) : [];
  }

  // src/shared/guided-questions/utils/guidedQuestionStorage.js
  var ANSWERED_GUIDED_QUESTIONS_STORAGE_PREFIX = "nrAiForm_answeredGuidedQuestions";
  function getAnsweredGuidedQuestionsStorageKey(threadId, stepId) {
    return `${ANSWERED_GUIDED_QUESTIONS_STORAGE_PREFIX}:${threadId}:${stepId}`;
  }
  function loadAnsweredGuidedQuestionIds(threadId, stepId) {
    if (!threadId || !stepId) return [];
    try {
      const raw = localStorage.getItem(getAnsweredGuidedQuestionsStorageKey(threadId, stepId));
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  function saveAnsweredGuidedQuestionId(threadId, stepId, questionId) {
    if (!threadId || !stepId || !questionId) return;
    try {
      const existingIds = loadAnsweredGuidedQuestionIds(threadId, stepId);
      if (existingIds.includes(String(questionId))) return;
      existingIds.push(String(questionId));
      localStorage.setItem(
        getAnsweredGuidedQuestionsStorageKey(threadId, stepId),
        JSON.stringify(existingIds)
      );
    } catch (error) {
      console.error("Error saving answered guided question:", error);
    }
  }
  function hasUsableAssistantReply(messages) {
    return Array.isArray(messages) && messages.some((msg) => String(msg || "").trim().length > 0);
  }

  // src/shared/guided-questions/utils/guidedQuestionLifecycle.js
  function createPendingGuidedQuestion(questionId, stepId, questionText) {
    if (!questionId || !stepId || !questionText) return null;
    return {
      questionId: String(questionId),
      stepId: String(stepId),
      questionText: String(questionText)
    };
  }
  function completePendingGuidedQuestion(threadId, pendingGuidedQuestion) {
    if (!pendingGuidedQuestion) return null;
    saveAnsweredGuidedQuestionId(threadId, pendingGuidedQuestion.stepId, pendingGuidedQuestion.questionId);
    return null;
  }
  function shouldRestorePendingGuidedQuestion(pendingGuidedQuestion, currentStep) {
    if (!pendingGuidedQuestion) return false;
    return String(currentStep || "") === String(pendingGuidedQuestion.stepId || "");
  }

  // src/shared/guided-questions/styles/guidedQuestionsStyles.js
  var GUIDED_QUESTIONS_STYLES = `
        .wp-chat-guided-questions {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: flex-end;
            gap: 14px;
            padding-top: 12px;
            margin-top: auto;
        }

        .wp-chat-guided-question {
            max-width: 85%;
            border: 1px solid #e6e9ef;
            border-radius: 8px;
            background: #f8f9fb;
            color: #4b5563;
            font-size: 15px;
            line-height: 1.35;
            padding: 12px 16px;
            cursor: pointer;
            text-align: left;
            box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
            transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .wp-chat-guided-question:hover {
            background: #f2f4f7;
            border-color: #d8dee8;
            box-shadow: 0 2px 4px rgba(16, 24, 40, 0.1);
        }
`;

  // src/shared/guided-questions/ui/guidedQuestionsRenderer.js
  function createGuidedQuestionsRenderer({
    guidedQuestionsContainer,
    chatMessages,
    onQuestionClick
  }) {
    function hideGuidedQuestions() {
      guidedQuestionsContainer.innerHTML = "";
      guidedQuestionsContainer.style.display = "none";
    }
    function createGuidedQuestionButton(question) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "wp-chat-guided-question";
      button.textContent = String(question.question || "");
      button.dataset.questionId = String(question.id || "");
      button.dataset.stepId = String(question.stepId || "");
      button.addEventListener("click", () => onQuestionClick(button));
      return button;
    }
    function renderGuidedQuestions(stepId, questions) {
      if (!stepId || !Array.isArray(questions) || questions.length === 0) {
        hideGuidedQuestions();
        return;
      }
      guidedQuestionsContainer.innerHTML = "";
      questions.forEach((question) => {
        if (!question || !question.id || !question.question) return;
        guidedQuestionsContainer.appendChild(createGuidedQuestionButton(question));
      });
      if (guidedQuestionsContainer.children.length === 0) {
        hideGuidedQuestions();
        return;
      }
      chatMessages.appendChild(guidedQuestionsContainer);
      guidedQuestionsContainer.style.display = "flex";
    }
    return {
      hideGuidedQuestions,
      renderGuidedQuestions
    };
  }

  // src/shared/clientInstance.js
  function isDevClientInstance() {
    const clientInstance = localStorage.getItem("clientInstance");
    if (clientInstance === "aot") {
      var url = "https://abin-aot.github.io/nr-ai-form/client-scripts/client.js";
      var script = document.createElement("script");
      script.src = url;
      script.type = "module";
      document.head.appendChild(script);
    } else if (clientInstance === "aot-ks") {
      var url = "https://krishnan-aot.github.io/nr-ai-form/client-scripts/client.js";
      var script = document.createElement("script");
      script.src = url;
      script.type = "module";
      document.head.appendChild(script);
    } else if (clientInstance === "aot-aj") {
      var url = "https://ann-aot.github.io/nr-ai-form/client-scripts/client.js";
      var script = document.createElement("script");
      script.src = url;
      script.type = "module";
      document.head.appendChild(script);
    } else if (clientInstance === "css") {
      var url = "https://timcsaky.github.io/nr-ai-form/client-scripts/client.js";
      var script = document.createElement("script");
      script.src = url;
      script.type = "module";
      document.head.appendChild(script);
    }
    return Boolean(clientInstance);
  }

  // src/shared/index.js
  if (!isDevClientInstance()) {
    let createFallbackThreadId = function () {
      const randomBytes = new Uint8Array(16);
      globalThis.crypto.getRandomValues(randomBytes);
      const randomHex = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
      return `session-${randomHex}`;
    }, getStoredThreadId = function () {
      try {
        return localStorage.getItem(THREAD_ID_STORAGE_KEY) || createFallbackThreadId();
      } catch {
        return createFallbackThreadId();
      }
    }, saveThreadId = function (threadId) {
      if (!threadId) return;
      try {
        localStorage.setItem(THREAD_ID_STORAGE_KEY, threadId);
        sessionStorage.setItem(THREAD_ID_STORAGE_KEY, threadId);
      } catch (error) {
        console.error("Unable to save thread ID to localStorage and sessionStorage:", error);
      }
    }, getHistoryStorageKey = function (threadId) {
      return `${CHAT_HISTORY_STORAGE_PREFIX}:${threadId}`;
    }, getScrollStorageKey = function (threadId) {
      return `${CHAT_SCROLL_STORAGE_PREFIX}:${threadId}`;
    }, loadChatHistory = function (threadId) {
      try {
        const raw = localStorage.getItem(getHistoryStorageKey(threadId));
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }, appendChatHistory = function (threadId, role, text) {
      try {
        const history = loadChatHistory(threadId);
        history.push({ role, text });
        localStorage.setItem(getHistoryStorageKey(threadId), JSON.stringify(history));
      } catch (error) {
        console.error("Error appending chat history:", error);
      }
    }, loadChatScrollPosition = function (threadId) {
      try {
        const raw = localStorage.getItem(getScrollStorageKey(threadId));
        const parsed = Number(raw);
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
      } catch {
        return 0;
      }
    }, saveChatScrollPosition = function (threadId, scrollTop) {
      if (!threadId) return;
      try {
        localStorage.setItem(getScrollStorageKey(threadId), String(Math.max(0, scrollTop || 0)));
      } catch (error) {
        console.error("Error saving chat scroll position:", error);
      }
    }, migrateChatHistory = function (oldThreadId, newThreadId) {
      if (!oldThreadId || !newThreadId || oldThreadId === newThreadId) return;
      try {
        const oldKey = getHistoryStorageKey(oldThreadId);
        const newKey = getHistoryStorageKey(newThreadId);
        if (!localStorage.getItem(newKey)) {
          const oldData = localStorage.getItem(oldKey);
          if (oldData) {
            localStorage.setItem(newKey, oldData);
          }
        }
      } catch (error) {
        console.error("Error migrating chat history to new thread ID:", error);
      }
    }, migrateChatScrollPosition = function (oldThreadId, newThreadId) {
      if (!oldThreadId || !newThreadId || oldThreadId === newThreadId) return;
      try {
        const oldKey = getScrollStorageKey(oldThreadId);
        const newKey = getScrollStorageKey(newThreadId);
        if (!localStorage.getItem(newKey)) {
          const oldData = localStorage.getItem(oldKey);
          if (oldData !== null) {
            localStorage.setItem(newKey, oldData);
          }
        }
      } catch (error) {
        console.error("Error migrating chat scroll position to new thread ID:", error);
      }
    }, extractThreadIdFromResponse = function (response) {
      if (!response) return null;
      if (typeof response.thread_id === "string") return response.thread_id;
      const body = response.response;
      if (!body) return null;
      if (Array.isArray(body)) {
        const threadObj = body.find((item) => item && typeof item.thread_id === "string");
        return threadObj ? threadObj.thread_id : null;
      }
      if (typeof body.thread_id === "string") return body.thread_id;
      return null;
    }, tryParseJson = function (value) {
      if (typeof value !== "string") return value;
      let cleanedValue = value.trim();
      const match = cleanedValue.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (match) {
        cleanedValue = match[1].trim();
      }
      const jsonMatch = cleanedValue.match(/^(\[[\s\S]*\]|\{[\s\S]*\})/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[1]);
        } catch {
          console.error("Failed to parse JSON from response");
        }
      }
      try {
        return JSON.parse(cleanedValue);
      } catch {
        return null;
      }
    }, parseFormSupportSuggestions = function (response) {
      const suggestions = [];
      const responseArr = response && Array.isArray(response.response) ? response.response : [];
      responseArr.forEach((item) => {
        const originalResults = Array.isArray(item && item.original_results) ? item.original_results : [];
        originalResults.forEach((result) => {
          if (!result || result.source !== "FormSupportAgentA2A") return;
          const parsed = tryParseJson(result.response);
          const parsedItems = Array.isArray(parsed) ? parsed : [parsed];
          parsedItems.forEach((parsedItem) => {
            if (!parsedItem || !parsedItem.id) return;
            suggestions.push({
              id: parsedItem.id,
              type: String(parsedItem.type || "").toLowerCase(),
              suggestedvalue: parsedItem.suggestedvalue
            });
          });
        });
      });
      return suggestions;
    }, getAssociatedLabelText = function (element) {
      if (!element) return "";
      if (element.id) {
        const byFor = document.querySelector(`label[for="${CSS.escape(element.id)}"]`);
        if (byFor && byFor.textContent) return byFor.textContent;
      }
      const parentLabel = element.closest("label");
      return parentLabel && parentLabel.textContent ? parentLabel.textContent : "";
    }, setFieldValueAndNotify = function (element, value) {
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    }, findFieldElementsByIdentifier = function (identifier) {
      const escaped = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(identifier) : identifier;
      const byId = document.getElementById(identifier);
      if (byId) return [byId];
      const byDataId = Array.from(document.querySelectorAll(`[data-id="${escaped}"]`));
      if (byDataId.length > 0) return byDataId;
      const byName = Array.from(document.getElementsByName(identifier));
      if (byName.length > 0) return byName;
      return [];
    }, applySuggestionToElements = function (suggestion, elements) {
      if (!elements || elements.length === 0) return false;
      const expected = normalizeComparableValue(suggestion.suggestedvalue);
      const type = String(suggestion.type || "").toLowerCase();
      const first = elements[0];
      const radioElements = elements.filter((el) => el.type === "radio");
      if (type === "radio" || radioElements.length > 0) {
        const target = (radioElements.length > 0 ? radioElements : elements).find((el) => {
          const byValue = normalizeComparableValue(el.value);
          const byLabel = normalizeComparableValue(getAssociatedLabelText(el));
          return byValue === expected || byLabel === expected;
        });
        if (target) {
          target.checked = true;
          target.dispatchEvent(new Event("click", { bubbles: true }));
          target.dispatchEvent(new Event("change", { bubbles: true }));
          return true;
        }
        return false;
      }
      const checkboxElements = elements.filter((el) => el.type === "checkbox");
      if (type === "checkbox" || checkboxElements.length > 0) {
        const truthyValues = ["y", "yes", "true", "1", "on", "checked"];
        const falsyValues = ["n", "no", "false", "0", "off", "unchecked"];
        let targetState = null;
        if (truthyValues.includes(expected)) targetState = true;
        if (falsyValues.includes(expected)) targetState = false;
        if (targetState === null) {
          console.warn(`Unable to determine target state for checkbox suggestion with value "${suggestion.suggestedvalue}". Expected values: ${truthyValues.concat(falsyValues).join(", ")}`);
          return false;
        }
        const target = checkboxElements.find((el) => {
          return el.getAttribute("data-id") === suggestion.id || el.id === suggestion.id;
        });
        if (target) {
          target.checked = targetState;
          target.dispatchEvent(new Event("click", { bubbles: true }));
          target.dispatchEvent(new Event("change", { bubbles: true }));
          return true;
        }
        console.warn(`Checkbox element for suggestion with id "${suggestion.id}" was not found.`);
        return false;
      }
      if (first.tagName && first.tagName.toLowerCase() === "select") {
        const selectEl = first;
        const matchedOption = Array.from(selectEl.options || []).find((opt) => {
          const byText = normalizeComparableValue(opt.textContent);
          const byValue = normalizeComparableValue(opt.value);
          return byText === expected || byValue === expected;
        });
        if (matchedOption) {
          setFieldValueAndNotify(selectEl, matchedOption.value);
          return true;
        }
        return false;
      }
      if (first.tagName && (first.tagName.toLowerCase() === "input" || first.tagName.toLowerCase() === "textarea")) {
        setFieldValueAndNotify(first, suggestion.suggestedvalue ?? "");
        return true;
      }
      return false;
    }, savePendingSuggestions = function (suggestions) {
      try {
        sessionStorage.setItem(PENDING_SUGGESTIONS_KEY, JSON.stringify(suggestions));
      } catch (e) {
      }
    }, loadPendingSuggestions = function () {
      try {
        const r = sessionStorage.getItem(PENDING_SUGGESTIONS_KEY);
        return r ? JSON.parse(r) : [];
      } catch (e) {
        return [];
      }
    }, clearPendingSuggestions = function () {
      sessionStorage.removeItem(PENDING_SUGGESTIONS_KEY);
    }, ensureAspNetHook = function () {
      if (_aspNetHooked) return;
      try {
        if (typeof Sys === "undefined" || !Sys.WebForms) {
          setTimeout(ensureAspNetHook, 500);
          return;
        }
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function () {
          const pending = loadPendingSuggestions();
          if (pending.length > 0) waitForDomSettle(null, applyNextPendingSuggestion);
        });
        _aspNetHooked = true;
      } catch (e) {
      }
    }, waitForDomSettle = function (root, callback, quietMs, maxWaitMs) {
      quietMs = quietMs || 300;
      maxWaitMs = maxWaitMs || 5e3;
      var target = root || document.body;
      var quietTimer = null;
      var giveUpTimer = null;
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        if (observer) observer.disconnect();
        clearTimeout(quietTimer);
        clearTimeout(giveUpTimer);
        callback();
      }
      var observer = null;
      try {
        observer = new MutationObserver(function () {
          clearTimeout(quietTimer);
          quietTimer = setTimeout(finish, quietMs);
        });
        observer.observe(target, { childList: true, subtree: true, attributes: true, characterData: true });
      } catch (e) {
        callback();
        return;
      }
      quietTimer = setTimeout(finish, quietMs);
      giveUpTimer = setTimeout(finish, maxWaitMs);
    }, applyFormSupportSuggestionsFromResponse = function (response) {
      ensureAspNetHook();
      const suggestions = parseFormSupportSuggestions(response);
      if (suggestions.length === 0) return;
      clearPendingSuggestions();
      savePendingSuggestions(suggestions);
      applyNextPendingSuggestion();
    }, applyNextPendingSuggestion = function () {
      const suggestions = loadPendingSuggestions();
      if (suggestions.length === 0) {
        clearPendingSuggestions();
        return;
      }
      const suggestion = suggestions[0];
      const remaining = suggestions.slice(1);
      const maxAttempts = 33;
      let attempts = 0;
      function tryApply() {
        const elements = findFieldElementsByIdentifier(suggestion.id);
        if (elements.length === 0 && attempts < maxAttempts) {
          attempts++;
          setTimeout(tryApply, 150);
          return;
        }
        if (elements.length === 0) {
          console.warn(`FormSupport: element not found after retries, skipping id=${suggestion.id}`);
          savePendingSuggestions(remaining);
          if (remaining.length > 0) setTimeout(applyNextPendingSuggestion, 100);
          return;
        }
        waitForDomSettle(null, function () {
          const freshElements = findFieldElementsByIdentifier(suggestion.id);
          if (freshElements.length === 0) {
            console.warn(`FormSupport: element disappeared after DOM settle, skipping id=${suggestion.id}`);
            savePendingSuggestions(remaining);
            if (remaining.length > 0) setTimeout(applyNextPendingSuggestion, 100);
            return;
          }
          savePendingSuggestions(remaining);
          const triggersPostback = suggestion.type === "radio" || suggestion.type === "checkbox" || suggestion.type === "select";
          const applied = applySuggestionToElements(suggestion, freshElements);
          if (!applied) {
            console.warn(`FormSupport suggestion could not be applied for id=${suggestion.id}`);
          }
          if (!triggersPostback) {
            if (remaining.length > 0) {
              waitForDomSettle(null, applyNextPendingSuggestion);
            } else {
              clearPendingSuggestions();
            }
          } else if (!_aspNetHooked) {
            if (remaining.length > 0) setTimeout(applyNextPendingSuggestion, 900);
            else setTimeout(clearPendingSuggestions, 900);
          }
        });
      }
      tryApply();
    }, resumePendingSuggestions = function () {
      const pending = loadPendingSuggestions();
      if (pending.length === 0) return;
      ensureAspNetHook();
      waitForDomSettle(null, applyNextPendingSuggestion);
    }, injectStyles = function () {
      if (document.getElementById("wp-chat-styles")) return;
      const style = document.createElement("style");
      style.id = "wp-chat-styles";
      style.textContent = `
        .wp-chat-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99998;
            padding: 14px 24px;
            background: #003366;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .wp-chat-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        .wp-chat-modal {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 420px!important;
            height: 650px!important;
            max-width: calc(100vw - 40px);
            max-height: calc(100vh - 40px);
            z-index: 99999;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .wp-chat-modal.open {
            display: flex;
        }

        .wp-chat-header {
            padding: 16px 20px;
            background: #003366;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 12px 12px 0 0;
        }

        .wp-chat-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: 600;
        }

        .wp-chat-title span {
            padding-top: 12px
        }

        .wp-chat-title-image {
            display: block;
            height: 32px;
            width: auto;
            max-width: 140px;
            object-fit: contain;
            flex-shrink: 0;
        }

        .wp-chat-close {
            background: none;
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            line-height: 1;
        }

        .wp-chat-close:hover {
            transform: rotate(90deg);
        }

        .wp-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .wp-chat-welcome {
            background: white;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .wp-chat-welcome p {
            margin: 0;
        }

        .wp-chat-welcome p {
            margin: 0 0 12px 0;
        }

        .wp-chat-message {
            display: flex;
        }

        .wp-chat-message-user {
            justify-content: flex-end;
        }

        .wp-chat-message-assistant {
            justify-content: flex-start;
        }

        .wp-chat-message-system {
            justify-content: center;
        }

        .wp-chat-bubble {
            max-width: 75%;
            padding: 12px 16px;
            border-radius: 12px;
            word-wrap: break-word;
            line-height: 1.5;
        }

        .wp-chat-message-user .wp-chat-bubble {
            background: #003366;
            color: white;
            border-bottom-right-radius: 4px;
        }

        .wp-chat-message-assistant .wp-chat-bubble {
            background: white;
            color: #333;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .wp-chat-message-system .wp-chat-bubble {
            background: transparent;
            color: #666;
            font-size: 12px;
            padding: 6px 10px;
        }

        .wp-chat-bubble ul {
            margin: 8px 0;
            padding-left: 20px;
        }

        .wp-chat-bubble li {
            margin: 4px 0;
        }

        .wp-chat-typing {
            display: none;
            padding: 0 20px 12px;
            gap: 10px;
            align-items: center;
        }

        ${GUIDED_QUESTIONS_STYLES}

        .wp-typing-dot {
            width: 8px;
            height: 8px;
            background: #999;
            border-radius: 50%;
            animation: wp-typing 1.4s infinite;
        }

        .wp-typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .wp-typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes wp-typing {
            0%, 60%, 100% {
                transform: translateY(0);
            }
            30% {
                transform: translateY(-8px);
            }
        }

        .wp-chat-input-container {
            padding: 16px;
            border-top: 1px solid #e0e0e0;
            background: white;
            border-radius: 0 0 12px 12px;
            display: flex;
            align-items: flex-end;
            gap: 12px;
        }

        .wp-chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            min-height: 48px;
            max-height: 140px;
            resize: none;
            overflow-y: auto;
            line-height: 1.5;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: inherit;
        }

        .wp-chat-input:focus {
            border-color: #003366;
        }

        .wp-chat-send {
            padding: 12px 20px;
            background: #9c9c9c;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            transition: all 0.2s;
        }

        .wp-chat-send-ready, .wp-chat-send:hover {
            background: #004080;
            transform: translateX(2px);
        }

        .wp-chat-send:disabled {
            cursor: default;
            opacity: 0.7;
        }

        @media (max-width: 768px) {
            .wp-chat-modal {
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                border-radius: 0;
            }

            .wp-chat-header {
                border-radius: 0;
            }

            .wp-chat-button {
                bottom: 16px;
                right: 16px;
            }
        }
    `;
      document.head.appendChild(style);
    }, initBot = function () {
      if (document.getElementById("wp-chat-button") || document.getElementById("wp-chat-modal")) {
        return;
      }
      const container = document.createElement("div");
      container.innerHTML = `
        <button class="wp-chat-button" id="wp-chat-button">Assistant</button>
        <div class="wp-chat-modal" id="wp-chat-modal">
            <div class="wp-chat-header">
                <div class="wp-chat-title">
                    <img
                        class="wp-chat-title-image"
                        src="https://test.j200.gov.bc.ca/pub/delivery/vfcbc/Images/banners/vfcbc_banner.png?v=5797"
                        alt="AI Assistant"
                    />
                    <span>AI Assistant</span>
                </div>
                <button class="wp-chat-close" id="wp-chat-close" type="button">
                    &times;
                </button>
            </div>

            <div class="wp-chat-messages" id="wp-chat-messages">
                <div class="wp-chat-welcome">
                    <div class="wp-chat-welcome">
                        <p><strong>How I can help</strong></p>
                        <p>I'm an AI assistant here to support you with your water licence application.
                        I can explain terms, clarify what information is needed, and suggest relevant resources based on what you share.
                        </p>
                        <p><strong>Disclaimer</strong></p>
                        <p>I don't provide legal advice and I'm not a substitute for guidance from FrontCounter
                        BC staff or qualified professionals. You're responsible for ensuring your submission
                        is accurate and complete. Please don't share personal information.
                        Your questions may be stored to help improve this service.
                        By using this assistant, you acknowledge and accept these terms.
                        </p>
                    </div>
                </div>

                <div class="wp-chat-guided-questions" id="wp-chat-guided-questions" aria-live="polite"></div>
            </div>

            <div class="wp-chat-typing" id="wp-chat-typing">
                <span class="wp-typing-dot"></span>
                <span class="wp-typing-dot"></span>
                <span class="wp-typing-dot"></span>
            </div>

            <div class="wp-chat-input-container">
                <textarea class="wp-chat-input" id="wp-chat-input" placeholder="Type your message..." rows="1"></textarea>
                <button class="wp-chat-send" id="wp-chat-send-btn" type="button">
                <span>\u27A4</span>
                </button>
            </div>
        </div>
    `;
      document.body.appendChild(container);
      injectStyles();
      const chatButton = document.getElementById("wp-chat-button");
      const chatModal = document.getElementById("wp-chat-modal");
      const closeBtn = document.getElementById("wp-chat-close");
      const chatInput = document.getElementById("wp-chat-input");
      const sendBtn = document.getElementById("wp-chat-send-btn");
      const chatMessages = document.getElementById("wp-chat-messages");
      const typingIndicator = document.getElementById("wp-chat-typing");
      const guidedQuestionsContainer = document.getElementById("wp-chat-guided-questions");
      let sessionId = getStoredThreadId();
      let restoredScrollTop = loadChatScrollPosition(sessionId);
      let guidedQuestionsRequestToken = 0;
      let pendingGuidedQuestion = null;
      const guidedQuestionsRenderer = createGuidedQuestionsRenderer({
        guidedQuestionsContainer,
        chatMessages,
        onQuestionClick: handleGuidedQuestionClick
      });
      saveThreadId(sessionId);
      const existingHistory = loadChatHistory(sessionId);
      if (existingHistory.length > 0) {
        const welcome = chatMessages.querySelector(".wp-chat-welcome");
        if (welcome) welcome.remove();
        existingHistory.forEach((entry) => {
          if (entry && typeof entry.role === "string") {
            appendMessage(entry.role, entry.text ?? "", false, false);
          }
        });
      }
      function restoreChatScrollPosition() {
        chatMessages.scrollTop = restoredScrollTop;
      }
      requestAnimationFrame(restoreChatScrollPosition);
      function openChatbot() {
        chatModal.classList.add("open");
        chatButton.style.display = "none";
        requestAnimationFrame(restoreChatScrollPosition);
        refreshGuidedQuestions();
        chatInput.focus();
        sessionStorage.setItem(CHAT_OPEN_STORAGE_KEY, "true");
      }
      function closeChatbot() {
        chatModal.classList.remove("open");
        chatButton.style.display = "flex";
        sessionStorage.removeItem(CHAT_OPEN_STORAGE_KEY);
      }
      function toggleChat() {
        const isChatOpenInStorage2 = sessionStorage.getItem(CHAT_OPEN_STORAGE_KEY) === "true";
        if (!isChatOpenInStorage2) {
          openChatbot();
        } else {
          closeChatbot();
        }
      }
      chatButton.addEventListener("click", toggleChat);
      closeBtn.addEventListener("click", toggleChat);
      const isChatOpenInStorage = sessionStorage.getItem(CHAT_OPEN_STORAGE_KEY) === "true";
      const isPopup = window.opener && window.opener !== window;
      const hasPopupPreviouslyLoaded = sessionStorage.getItem(POPUP_INITIALIZED_STORAGE_KEY) === "true";
      if (isChatOpenInStorage && (!isPopup || isPopup && hasPopupPreviouslyLoaded)) {
        openChatbot();
      }
      if (isPopup && !hasPopupPreviouslyLoaded) {
        sessionStorage.removeItem(CHAT_OPEN_STORAGE_KEY);
        sessionStorage.setItem(POPUP_INITIALIZED_STORAGE_KEY, "true");
      }
      function handleGuidedQuestionClick(button) {
        if (!button || sendBtn.disabled) return;
        const questionText = String(button.textContent || "").trim();
        const questionId = String(button.dataset.questionId || "").trim();
        const stepId = String(button.dataset.stepId || "").trim();
        if (!questionText) return;
        pendingGuidedQuestion = createPendingGuidedQuestion(questionId, stepId, questionText);
        button.remove();
        if (guidedQuestionsContainer.children.length === 0) {
          guidedQuestionsRenderer.hideGuidedQuestions();
        }
        sendMessage(questionText);
      }
      function restorePendingGuidedQuestion() {
        if (!pendingGuidedQuestion) return;
        const pendingStepId = pendingGuidedQuestion.stepId;
        pendingGuidedQuestion = null;
        const currentStep = 'step0'
        if (shouldRestorePendingGuidedQuestion({ stepId: pendingStepId }, currentStep)) {
          refreshGuidedQuestions();
        }
      }
      async function refreshGuidedQuestions() {
        if (!GUIDED_QUESTIONS_ENABLED) return;
        const stepId = getCurrentFormStepFromDom();
        const requestToken = ++guidedQuestionsRequestToken;
        try {
          const answeredQuestionIds = new Set(loadAnsweredGuidedQuestionIds(sessionId, stepId));
          const guidedQuestions = await fetchGuidedQuestions(stepId, GUIDED_QUESTIONS_API_URL);
          if (requestToken !== guidedQuestionsRequestToken) return;
          const visibleQuestions = guidedQuestions.filter((question) => question && question.id && question.question).filter((question) => !answeredQuestionIds.has(String(question.id)));
          guidedQuestionsRenderer.renderGuidedQuestions(stepId, visibleQuestions);
        } catch (error) {
          if (requestToken !== guidedQuestionsRequestToken) return;
          guidedQuestionsRenderer.hideGuidedQuestions();
          console.error("Error fetching guided questions:", error);
        }
      }
      async function sendMessage(prefilledText = null) {
        let text = typeof prefilledText === "string" ? prefilledText.trim() : chatInput.value.trim();
        if (!text) return;
        appendMessage("user", text, true, true, { placeAfterGuidedQuestions: true });
        chatInput.value = "";
        autoResizeChatInput();
        sendBtn.classList.remove("wp-chat-send-ready");
        showTyping(true);
        try {
          const currentStep = 'step0';
          console.log(`Invoking orchestrator with sessionId=${sessionId}, step=${currentStep}, query=${text}`);
          if (currentStep === FormSteps.step0bot) {
            text = `Human verification form query : ${text}`;
          }
          const response = await invokeOrchestrator(text, currentStep, sessionId);
          applyFormSupportSuggestionsFromResponse(response);
          const serverThreadId = extractThreadIdFromResponse(response);
          if (serverThreadId && serverThreadId !== sessionId) {
            migrateChatHistory(sessionId, serverThreadId);
            migrateChatScrollPosition(sessionId, serverThreadId);
            sessionId = serverThreadId;
            restoredScrollTop = loadChatScrollPosition(sessionId);
          }
          saveThreadId(sessionId);
          showTyping(false);
          const messages = extractAssistantMessages(response);
          const hasAssistantReply = hasUsableAssistantReply(messages);
          if (pendingGuidedQuestion && hasAssistantReply) {
            pendingGuidedQuestion = completePendingGuidedQuestion(sessionId, pendingGuidedQuestion);
          }
          if (pendingGuidedQuestion && !hasAssistantReply) {
            restorePendingGuidedQuestion();
          }
          messages.forEach((msg) => appendMessage("assistant", msg));
        } catch (error) {
          restorePendingGuidedQuestion();
          showTyping(false);
          appendMessage("system", "Sorry, I encountered an error connecting to the server.");
          console.error(error);
        }
      }
      function extractAssistantMessages(response) {
        if (response && response.response) {
          if (Array.isArray(response.response)) {
            const aggregatorItem = response.response.find((item) => item.source === "Aggregator");
            if (aggregatorItem && aggregatorItem.response) {
              return [String(aggregatorItem.response)];
            }
          } else if (response.response.agent_messages) {
            const messages = response.response.agent_messages;
            return Array.isArray(messages) ? messages.map(String) : [String(messages)];
          } else if (typeof response.response === "string") {
            return [response.response];
          }
        }
        if (typeof response === "string") {
          return [response];
        }
        return [JSON.stringify(response)];
      }
      function appendMessage(role, text, persist = true, scroll = true, options = {}) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `wp-chat-message wp-chat-message-${role}`;
        const bubble = document.createElement("div");
        bubble.className = "wp-chat-bubble";
        bubble.innerHTML = formatMessage(String(text));
        msgDiv.appendChild(bubble);
        const shouldPlaceAfterGuidedQuestions = options.placeAfterGuidedQuestions && guidedQuestionsContainer && guidedQuestionsContainer.style.display !== "none" && guidedQuestionsContainer.parentElement === chatMessages;
        if (shouldPlaceAfterGuidedQuestions) {
          if (guidedQuestionsContainer.nextSibling) {
            chatMessages.insertBefore(msgDiv, guidedQuestionsContainer.nextSibling);
          } else {
            chatMessages.appendChild(msgDiv);
          }
        } else {
          chatMessages.appendChild(msgDiv);
        }
        if (!shouldPlaceAfterGuidedQuestions && guidedQuestionsContainer && guidedQuestionsContainer.style.display !== "none") {
          chatMessages.appendChild(guidedQuestionsContainer);
        }
        if (persist) {
          appendChatHistory(sessionId, role, String(text));
        }
        if (scroll) {
          scrollToBottom();
        }
      }
      function formatMessage(text) {
        const FRONTCOUNTER_PLACEHOLDER = "-FRONTCOUNTER-BC-";
        const FRONTCOUNTER_LINK = "[FrontCounter BC](https://www2.gov.bc.ca/gov/content/industry/natural-resource-use/natural-resource-permits#:~:text=gov.bc.ca-,Contact%20information,-FrontCounter%20BC)";
        const normalizedText = String(text).replaceAll(FRONTCOUNTER_PLACEHOLDER, FRONTCOUNTER_LINK);
        const mdLinkPlaceholders = [];
        let processed = normalizedText.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, linkText, url) => {
          const idx = mdLinkPlaceholders.length;
          mdLinkPlaceholders.push(`<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
          return `\0MDLINK${idx}\0`;
        });
        const plainUrlPlaceholders = [];
        processed = processed.replace(/(?<!\x00MDLINK\d*)(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+)/g, (url) => {
          const idx = plainUrlPlaceholders.length;
          const href = url.startsWith("http") ? url : `https://${url}`;
          plainUrlPlaceholders.push(`<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`);
          return `\0PLAINURL${idx}\0`;
        });
        let formatted = processed.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        formatted = formatted.replace(/\n/g, "<br>");
        formatted = formatted.replace(/^[\u2022\-]\s+(.+)/gm, "<li>$1</li>");
        formatted = formatted.replace(/\x00MDLINK(\d+)\x00/g, (_, i) => mdLinkPlaceholders[Number(i)]);
        formatted = formatted.replace(/\x00PLAINURL(\d+)\x00/g, (_, i) => plainUrlPlaceholders[Number(i)]);
        if (formatted.includes("<li>")) {
          formatted = `<ul>${formatted}</ul>`;
        }
        return formatted;
      }
      function showTyping(show) {
        typingIndicator.style.display = show ? "flex" : "none";
        scrollToBottom();
        chatInput.disabled = show;
        sendBtn.disabled = show;
      }
      function autoResizeChatInput() {
        chatInput.style.height = "auto";
        chatInput.style.height = `${Math.min(chatInput.scrollHeight, 140)}px`;
      }
      function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        restoredScrollTop = chatMessages.scrollTop;
        saveChatScrollPosition(sessionId, restoredScrollTop);
      }
      chatMessages.addEventListener("scroll", () => {
        restoredScrollTop = chatMessages.scrollTop;
        saveChatScrollPosition(sessionId, restoredScrollTop);
      });
      sendBtn.addEventListener("click", sendMessage);
      chatInput.addEventListener("input", () => {
        autoResizeChatInput();
        if (chatInput.value.trim()) {
          sendBtn.classList.add("wp-chat-send-ready");
        } else {
          sendBtn.classList.remove("wp-chat-send-ready");
        }
      });
      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
      autoResizeChatInput();
      refreshGuidedQuestions();
      resumePendingSuggestions();
    }, clearChatStorage = function () {
      clearPendingSuggestions();
      try {
        localStorage.removeItem(THREAD_ID_STORAGE_KEY);
        sessionStorage.removeItem(THREAD_ID_STORAGE_KEY);
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key) continue;
          if (key === THREAD_ID_STORAGE_KEY || key.startsWith(CHAT_HISTORY_STORAGE_PREFIX) || key.startsWith(CHAT_SCROLL_STORAGE_PREFIX)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        console.error("Error clearing chat storage:", e);
      }
    };
    const x = 0;
    const isAIAssistantEnabled = Boolean(document.querySelector("[ai-mode]"));
    const ORCHESTRATOR_API_URL = "https://nraif-671b-dev-showcaseapp-api.icymushroom-bc5ec66d.canadacentral.azurecontainerapps.io/invoke";
    const GUIDED_QUESTIONS_ENABLED = false;
    const GUIDED_QUESTIONS_API_URL = new URL("/guided-questions", ORCHESTRATOR_API_URL).toString();
    const THREAD_ID_STORAGE_KEY = "nrAiForm_threadId";
    const CHAT_HISTORY_STORAGE_PREFIX = "nrAiForm_chatHistory";
    const CHAT_SCROLL_STORAGE_PREFIX = "nrAiForm_chatScroll";
    const CHAT_OPEN_STORAGE_KEY = "nrAiForm_chatOpen";
    const POPUP_INITIALIZED_STORAGE_KEY = "nrAiForm_popupInitialized";
    const PENDING_SUGGESTIONS_KEY = "wp_pending_suggestions";
    const FormSteps = { step1: "step1", step2: "step2", step3: "step3" };
    let _aspNetHooked = false;
    if (isAIAssistantEnabled) {
      if (!sessionStorage.getItem(THREAD_ID_STORAGE_KEY)) {
        clearChatStorage();
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBot);
      } else {
        initBot();
      }
    }
    async function invokeOrchestrator(query, step_number, session_id = null) {
      const payload = {
        query,
        step_number,
        session_id
      };
      try {
        const response = await fetch(ORCHESTRATOR_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Orchestrator API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error invoking Orchestrator Agent:", error);
        throw error;
      }
    }
  }

  // src/build-fish.js
  globalThis.tenant = "fish";
})();
