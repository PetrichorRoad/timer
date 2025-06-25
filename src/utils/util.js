import { ServUploadImage } from '@/api/modules/upload'
function removeLeadingNewlines(str) {
  return str.replace(/^[\n\s]+/, '')
}

function removeTrailingNewlines(str) {
  return str.replace(/[\n\s]+$/, '')
}

export function deltaToMessage(delta) {
  const resp = {
    items: [],
    mentions: [],
    mentionUids: [],
    quoteId: '',
    msgType: 1
  }

  for (const iterator of delta.ops) {
    const insert= iterator.insert

    let node = null
    if (resp.items.length) {
      node = resp.items[resp.items.length - 1]
    }

    if (typeof insert === 'string') {
      if (!insert || insert == '\n') continue

      if (node && node.type == 1) {
        node.content = node.content + insert
        continue
      }

      resp.items.push({
        type: 1,
        content: insert
      })

      continue
    }

    // @好友
    if (insert && insert.mention) {
      const mention = insert.mention

      resp.mentions.push({
        name: `${mention.denotationChar}${mention.value}`,
        atid: parseInt(mention.id)
      })

      if (node && node.type == 1) {
        node.content = node.content + ` ${mention.denotationChar}${mention.value}`
        continue
      }

      resp.items.push({
        type: 1,
        content: `${mention.denotationChar}${mention.value}`
      })

      continue
    }

    // 图片
    if (insert && insert.image) {
      resp.items.push({
        type: 3,
        content: insert.image
      })
      continue
    }

    // 表情
    if (insert && insert.emoji) {
      const { emoji } = insert

      if (node && node.type == 1) {
        node.content = node.content + emoji.alt
        continue
      }

      resp.items.push({
        type: 1,
        content: emoji.alt
      })

      continue
    }

    if (insert && insert.quote) {
      resp.quoteId = insert.quote.id
      continue
    }
  }

  // 去除前后多余空格
  if (resp.items.length) {
    if (resp.items[0].type == 1) {
      resp.items[0].content = removeLeadingNewlines(resp.items[0].content)
    }

    if (resp.items[resp.items.length - 1].type == 1) {
      resp.items[resp.items.length - 1].content = removeTrailingNewlines(
        resp.items[resp.items.length - 1].content
      )
    }
  }

  if (resp.items.length > 1) {
    resp.msgType = 12
  }

  if (resp.items.length == 1) {
    resp.msgType = resp.items[0].type
  }

  resp.mentionUids = resp.mentions.map((item) => item.atid)

  return resp
}

export function deltaToString(delta){
  let content = ''

  for (const o of delta.ops) {
    const insert = o.insert

    if (typeof insert === 'string') {
      if (!insert || insert == '\n') continue

      content += insert
      continue
    }

    // @好友
    if (insert && insert.mention) {
      const { mention } = insert
      content += ` ${mention.denotationChar}${mention.value} `
      continue
    }

    // 图片
    if (insert && insert.image) {
      content += '[图片]'
      continue
    }

    // 表情
    if (insert && insert.emoji) {
      content += insert.emoji.alt
      continue
    }
  }

  return content
}

export function isEmptyDelta(delta) {
  return delta.ops.length == 1 && delta.ops[0].insert == '\n'
}

export function onUploadImage(file) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = async () => {
      const form = new FormData()
      form.append('file', file)
      form.append('width', image.width.toString())
      form.append('height', image.height.toString())

      const { code, data } = await ServUploadImage(form)
      code == 200 && resolve(data.src)

      URL.revokeObjectURL(image.src)
    }
  })
}
