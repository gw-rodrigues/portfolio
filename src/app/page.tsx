'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import FloatingBackground from '@/components/FloatingBackground'
import Image from 'next/image'

type TGithubProps = {
  id: number
  name: string
  description: string
  html_url: string
  topics: string
  owner: { avatar_url: string }
}

const fetchGitHubRepos = async () => {
  // Fazendo a requisição à API do GitHub para buscar os repositórios do usuário
  const response = await fetch(
    'https://api.github.com/users/gw-rodrigues/repos?per_page=6',
  )

  const data = await response.json()
  console.log(data)
  return data
  // Filtra os repositórios para mostrar apenas os que têm o tópico 'portfolio'

  return data.filter((repo: TGithubProps) => repo.topics.includes('portfolio'))
}

export default function Home() {
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
    <div className="bg-gray-900 text-white h-dvh font-sans">
      {/* Canvas com o fundo dinâmico 3D */}
      <FloatingBackground />

      <section className="relative z-10 p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Lastest Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Exibe os repositórios filtrados com a tag 'portfolio' */}
          {repos.map((repo: TGithubProps) => (
            <motion.div
              key={repo.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-4 rounded-xl shadow-md transition-transform"
            >
              <Image
                width={300}
                height={300}
                src={repo.owner.avatar_url}
                alt="Project Screenshot"
                className="rounded-md mb-2"
              />
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p className="text-gray-400 text-sm">{repo.description}</p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white"
              >
                View on GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-3 text-sm text-gray-300">
          <li className="bg-gray-800 px-3 py-1 rounded-full">React</li>
          <li className="bg-gray-800 px-3 py-1 rounded-full">Tailwind CSS</li>
          <li className="bg-gray-800 px-3 py-1 rounded-full">JavaScript</li>
          <li className="bg-gray-800 px-3 py-1 rounded-full">UI/UX Design</li>
        </ul>
      </section>

      <footer className="p-6 text-center border-t border-gray-700 text-sm text-gray-400">
        <p>Connect with me:</p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://linkedin.com/in/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>
          <a href="mailto:seuemail@email.com" className="hover:text-white">
            Email
          </a>
        </div>
      </footer>
    </div>
  )
}
