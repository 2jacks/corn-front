function createPopupContent(area, stats) {
  return ` <div>
              <div>
                <span>Площадь: </span>
                <span>${area}</span>
              </div>
              <div>
                <span>Минимум:</span>
                <span>${stats.min}</span>
              </div>
              <div>
                <span>Максимум:</span>
                <span>${stats.max}</span>
              </div>
              <div>
                <span>Среднее:</span>
                <span>${stats.mean}</span>
              </div>
             </div>`
}

export { createPopupContent }
