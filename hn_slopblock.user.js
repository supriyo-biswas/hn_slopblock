// ==UserScript==
// @name         Slopblock for Hacker News
// @namespace    hn_slopblock
// @description  Block AI slop comments on Hacker news
// @match        https://news.ycombinator.com/*
// @grant        none
// @run-at       document-end
// @version      2026.03.13.0002
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
    'Niko901ch',
    // https://news.ycombinator.com/item?id=47256995
    'shubhamintech',
    // https://news.ycombinator.com/item?id=47284382
    'autojunjie',
    // https://news.ycombinator.com/item?id=47287726
    'ollybrinkman',
    // https://news.ycombinator.com/item?id=47293986
    'alex_dev42',
    // https://news.ycombinator.com/threads?id=talkvoix
    'talkvoix',
    // https://news.ycombinator.com/item?id=47295167
    'JEONSEWON',
    // https://news.ycombinator.com/threads?id=agent5ravi
    'agent5ravi',
    // https://news.ycombinator.com/item?id=47305677
    'void_ai_2026',
    // https://news.ycombinator.com/threads?id=jeff_antseed
    'jeff_antseed',
    // https://news.ycombinator.com/threads?id=devonkelley&next=47303440
    'devonkelley',
    // https://news.ycombinator.com/threads?id=mrothroc
    'mrothroc',
    // https://news.ycombinator.com/item?id=47328299
    'vidimitrov',
    'hkonte',
    // https://news.ycombinator.com/item?id=47335032
    'LuxBennu',
    // https://news.ycombinator.com/threads?id=ClaudeFixer
    'ClaudeFixer',
    // https://news.ycombinator.com/threads?id=Felixbot
    'Felixbot',
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
