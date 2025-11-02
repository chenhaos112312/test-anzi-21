import { classNames } from '@/src/lib/util'
import { Post } from '@/src/types/blog'
import Link from 'next/link'
import { PostCategory, PostImage, PostTime } from './CardInfo'

type GridCardProps = {
  post: Post
  size: 'small' | 'medium' | 'large'
}

const SIZE = {
  large: {
    card: classNames(
      'w-full aspect-[274/439]', // 274:439 比例
      'md:w-[17.125rem] md:h-[27.4375rem]', // 274px = 17.125rem, 439px = 27.4375rem
      'lg:w-[20rem] lg:h-[32rem]' // 放大尺寸
    ),
    image: classNames(
      'h-2/3', // 图片区域占2/3高度
      'md:h-2/3',
      'lg:h-2/3'
    ),
    title: classNames(
      'line-clamp-2 text-xl',
      'md:text-lg md:line-clamp-3',
      'lg:text-xl lg:line-clamp-4'
    ),
    content: 'h-1/3', // 内容区域占1/3高度
  },
  medium: {
    card: classNames(
      'w-full aspect-[274/439]',
      'md:w-[17.125rem] md:h-[27.4375rem]',
      'lg:w-[18rem] lg:h-[28.875rem]'
    ),
    image: 'h-3/5 md:h-3/5',
    title: 'line-clamp-2 text-lg md:text-base md:line-clamp-3',
    content: 'h-2/5 md:h-2/5',
  },
  small: {
    card: classNames(
      'w-full aspect-[274/439]',
      'md:w-[17.125rem] md:h-[27.4375rem]',
      'lg:w-[16rem] lg:h-[25.625rem]'
    ),
    image: 'h-4/5 md:h-4/5',
    title: 'line-clamp-2 text-base md:text-sm md:line-clamp-3',
    content: 'h-1/5 md:h-1/5',
  },
}

const GridCard = ({ post, size }: GridCardProps) => {
  const { title, slug, cover, date, category } = post

  return (
    <Link
      href={{
        pathname: '/post/[slug]',
        query: {
          slug: slug,
        },
      }}
    >
      <div
        className={classNames(
          'group relative flex transform-gpu cursor-pointer select-none flex-col overflow-hidden rounded-3xl bg-white shadow-card shadow-neutral-200 transition duration-500 ease-in-out hover:rotate-0 hover:active:scale-95 mobile-hover:hover:scale-95',
          'md:shadow-none md:hover:shadow-card',
          'dark:bg-neutral-900 dark:shadow-none dark:hover:shadow-none',
          SIZE[size].card
        )}
      >
        <header
          className={classNames(
            'relative transition duration-500 ease-in-out md:filter md:group-hover:brightness-90',
            SIZE[size].image
          )}
        >
          <PostImage
            cover={cover}
            alt={title}
            className={
              'w-full h-full object-cover opacity-100 transition-all duration-500 ease-in-out md:group-hover:scale-105 md:group-hover:opacity-90'
            }
          />
        </header>
        <div 
          className={classNames(
            "z-10 flex flex-col justify-between p-4 transition duration-500 ease-in-out bg-white dark:bg-neutral-900",
            "md:p-5", // 稍微调整内边距
            SIZE[size].content
          )}
        >
          <article className="flex flex-col items-start justify-start space-y-2 md:space-y-3">
            <PostCategory category={category} />
            <h2
              className={`${SIZE[size].title} font-bold text-black transition duration-500 ease-in-out dark:text-white w-full`}
            >
              {title}
            </h2>
          </article>
          <div className="mt-2 md:mt-3">
            <PostTime date={date.created} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GridCard