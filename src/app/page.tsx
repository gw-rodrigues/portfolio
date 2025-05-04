'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import FloatingBackground from '@/components/FloatingBackground'
import Image from 'next/image'
import Link from 'next/link'

type TGithubProps = {
  id: number
  name: string
  description: string
  html_url: string
  topics: string
  owner: { avatar_url: string; login: string }
}

const fallbackRepos = [
  {
    id: 'mock1',
    name: 'Meu Projeto Fallback',
    description: 'Este é um projeto fictício usado como fallback.',
    html_url: 'https://github.com/gw-rodrigues/fallback',
    topics: ['portfolio', 'react', 'tailwind', 'motion'],
    owner: {
      avatar_url: 'https://avatars.githubusercontent.com/u/92688864?v=4',
    },
  },
]

const fetchGitHubRepos = async () => {
  try {
    const res = await fetch(
      'https://api.github.com/search/repositories?q=user:gw-rodrigues+topic:portfolio&sort=updated&order=desc&per_page=6',
    )
    if (!res.ok) throw new Error('Request failed')

    const data = await res.json()
    console.log(data)
    return data.items || fallbackRepos
  } catch (err) {
    console.error('Erro ao buscar repositórios:', err)
    return fallbackRepos
  }
}

export default function Home() {
  const skills = [
    'React',
    'Next.js',
    'Tailwind CSS',
    'JavaScript',
    'Typescript',
    'Redux',
    'Zustand',
    'Styled-Components',
    'UX/UI Design',
    'CSS',
    'HTML5',
    'Sass',
    'Figma',
    'Git',
  ]
  const [repos, setRepos] = useState([])

  // Quando o componente for montado, busca os repositórios do GitHub
  useEffect(() => {
    const getRepos = async () => {
      const repositories = await fetchGitHubRepos()
      setRepos(repositories)
    }

    getRepos()
  }, [])

  return (
    <div className="bg-gray-900 text-white relative">
      <FloatingBackground />
      <header className="flex flex-col items-center py-80 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-5xl md:text-6xl font-bold"
        >
          Hi, I&apos;m Gleydson!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7 }}
          className="mt-4 text-gray-300 max-w-xl text-sm md:text-lg"
        >
          I love turning ideas into clean, user-friendly interfaces.
        </motion.p>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Lastest Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mt-10">
          {/* Exibe os repositórios filtrados com a tag 'portfolio' */}
          {repos.map((repo: TGithubProps, i) => (
            <motion.div
              key={repo.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.25 * i }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all border-6 border-gray-800  hover:border-purple-900 group duration-200"
            >
              <Image
                src={`https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`}
                alt="Imagem do projeto"
                width={800}
                height={400}
                className="object-cover "
                priority
              />

              <div className="p-4  flex flex-col justify-between">
                <ul className="flex flex-wrap gap-3 text-[.7rem] text-gray-300">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="bg-gray-700 px-2 py-1 rounded-full "
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-800 group-hover:bg-purple-900 cursor-pointer flex justify-center items-center text-blue-400 group-hover:text-white text-sm transition-all duration-200"
                >
                  View on GitHub
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-30 px-4">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-3 text-sm text-gray-300">
          {skills.map((skill, i) => (
            <motion.li
              key={skill}
              className="bg-gray-800 px-4 py-2 rounded-full"
              transition={{ duration: 0.25 * i }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </section>

      <footer className="text-center border-t border-gray-700 bg-gray-800 text-sm text-gray-400 p-4 mt-40 relative z-10">
        <div className="flex justify-center gap-4 mt-2">
          <span>Connect with me:</span>
          <Link
            href="https://linkedin.com/in/gw-rodrigues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white text-blue-400"
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:seuemail@email.com"
            className="hover:text-white text-blue-400"
          >
            Email
          </Link>
        </div>
      </footer>
    </div>
  )
}
