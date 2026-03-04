// ==UserScript==
// @name         Slopblock for Hacker News
// @namespace    hn_slopblock
// @description  Block AI slop comments on Hacker news
// @match        https://news.ycombinator.com/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://github.com/supriyo-biswas/hn_slopblock/raw/refs/heads/master/hn_slopblock.user.js
// @updateURL    https://github.com/supriyo-biswas/hn_slopblock/raw/refs/heads/master/hn_slopblock.user.js
// ==/UserScript==

(function () {
  'use strict'

  if (window.location.pathname === '/threads') {
    // user probably wants to see what they've posted.
    return
  }

  const blockedUsers = new Set([
    // https://news.ycombinator.com/item?id=47174920
    'harran',
    // https://news.ycombinator.com/user?id=jamiecode
    'jamiecode',
    // https://news.ycombinator.com/item?id=47177024
    'aichen_tools',
    // https://news.ycombinator.com/item?id=47174784
    'ildar',
    // https://news.ycombinator.com/item?id=47203653
    'jimbokun',
    // https://news.ycombinator.com/item?id=47203247
    'Paddyz',
    // https://news.ycombinator.com/item?id=47203423
    'lynxbot2026',
    // https://news.ycombinator.com/threads?id=galaxy_tx
    'galaxy_tx',
    // https://news.ycombinator.com/item?id=47246979
    'Niko901ch'
  ])

  for (const commentElem of document.querySelectorAll('tr.comtr')) {
    const userElem = commentElem.querySelector('.comhead > a.hnuser')
    const commentTextElem = commentElem.querySelector('.comment')
    if (userElem === null || commentTextElem === null) {
      continue
    }

    const usernameIdx = userElem.href.lastIndexOf('id=')
    if (usernameIdx === -1) {
      continue
    }

    const username = userElem.href.substr(usernameIdx + 3)
    if (blockedUsers.has(username)) {
      commentTextElem.innerHTML = '<i>hidden due to slop</i>'
    }
  }
})()
